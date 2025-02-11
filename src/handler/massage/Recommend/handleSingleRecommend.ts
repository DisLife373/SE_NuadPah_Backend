import { FastifyInstance, FastifyReply } from "fastify";
import { RecommendSingleMassageBodyRequest } from "../../../type/handler/massage";
import redis from "../../../util/redis";

export const handleGetSingleDetail = async (
  request: RecommendSingleMassageBodyRequest,
  reply: FastifyReply,
  app: FastifyInstance
) => {
  try {
    // Get email from request body to query user id
    const { email } = request.body;

    const client = await app.pg.connect();
    const { userQuery } = await client.query(
      `
      SELECT * FROM public."User"
      WHERE email = $1;
    `,
      [email]
    );

    if (userQuery.rowCount < 1) {
      return reply.status(404).send({ error: "This User is not exist !" });
    }

    const userID = userQuery.rows[0].id;

    // Cache the recommendations for 60 seconds
    const cacheKey = `recommendations:${userID}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit !!!"); 

      return reply.status(200).send({
        message: "Give Old Recommend Single Massage Technique Successfully",
        data: JSON.parse(cachedData),
      });
    }
    console.log("Cache miss !!! Querying DB...");

    // Query the database if have no old recommendations
    const { rows } = await client.query(
      `
        SELECT 
          mt.mt_id, 
          mt.mt_name, 
          (
            COALESCE(ur.rating, 0) + COALESCE(ar.avg_rating, 0) * 0.6
          ) * CASE 
                WHEN EXISTS (
                    SELECT * FROM "Favorite" f 
                    WHERE f.id = $1 AND f.mt_id = mt.mt_id
                ) 
              THEN 1.3 ELSE 1
            END AS score
        FROM "MassageTechnique" mt
        LEFT JOIN user_single_rating ur ON mt.mt_id = ur.mt_id AND ur.id = $1
        LEFT JOIN avg_single_rating ar ON mt.mt_id = ar.mt_id
        ORDER BY score DESC;
      `,
      [userID]
    );

    await redis.setex(cacheKey, 60, JSON.stringify(rows)); // 60 seconds

    return reply.status(200).send({
      message: "Give New Recommend Single Massage Technique Successfully",
      data: rows,
    });
  } catch (err) {
    return reply
      .status(500)
      .send({ error: err, message: "Can't Find Single Massage Technique" });
  }
};
