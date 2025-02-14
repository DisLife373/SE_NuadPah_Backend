import { FastifyInstance, FastifyReply } from "fastify";
import { RecommendMassageBodyRequest } from "../../../type/handler/massage";
import redis from "../../../util/redis";
import crypto from "crypto";
import pool from "../../../util/postgres";

export const handleSingleRecommend = async (
  request: RecommendMassageBodyRequest,
  reply: FastifyReply
) => {
  try {
    // Get email from request body to query user id
    const { email } = request.body;

    const client = await pool.connect();
    const userQuery = await client.query(
      `
      SELECT id FROM public."User"
      WHERE email = $1;
    `,
      [email]
    );

    if (userQuery.rowCount == null || userQuery.rowCount < 1) {
      return reply.status(404).send({ error: "This User is not exist !" });
    }

    const userID = userQuery.rows[0].id;

    // Cache the recommendations for 60 seconds
    const cacheKey = `single_recommendations:${userID}`; // for data like List of Massage Techniques
    const hashKey = `single_recommendations_hash:${userID}`; // for hash of that data

    const cachedData = await redis.get(cacheKey);

    // Check if the data is cached that means this cache is up to date
    if (cachedData) {
      console.log("Cache HIT !!!");

      return reply.status(200).send({
        message: "Give Old Recommend Single Massage Technique Successfully",
        data: JSON.parse(cachedData),
      });
    }

    console.log("Cache MISS !!! Querying DB...");

    // Query new Recommendation if have no old recommendations
    const { rows, rowCount } = await client.query(
      `
        SELECT
          mt.mt_id,
          mt.mt_name,
          (
            COALESCE(ur.avg_rating, 0) + COALESCE(ar.avg_rating, 0) * 0.6
          ) * CASE
                WHEN EXISTS (
                    SELECT * FROM "SingleFavorite" f
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

    client.release();

    if (rowCount == null || rowCount < 1) {
      return reply.status(404).send({
        error: "Have no any Single Massage Technique Recommendations",
      });
    }

    const hashData = await redis.get(hashKey);
    const newHash = crypto
      .createHash("sha256")
      .update(JSON.stringify(rows)) // new data from query
      .digest("hex");

    // New data is the same as the Old data
    if (hashData === newHash) {
      console.log("Cache HIT !!! Not Update Cache");

      return reply.status(200).send({
        message:
          "Give New Recommend Single Massage Technique Successfully (Not Update Cache)",
        data: rows,
      });
    }

    // New data is different from the Old data
    console.log("Cache MISS !!! Update Cache");
    await redis.set(cacheKey, JSON.stringify(rows), "EX", 60); // 60 seconds
    await redis.set(hashKey, newHash, "EX", 60); // 60 seconds

    return reply.status(200).send({
      message:
        "Give New Recommend Single Massage Technique Successfully (Update Cache)",
      data: rows,
    });
  } catch (err) {
    return reply
      .status(500)
      .send({ error: err, message: "Can't Find Single Massage Technique" });
  }
};
