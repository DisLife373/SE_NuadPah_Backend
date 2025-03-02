import { FastifyInstance, FastifyReply } from "fastify";
import { GetSingleMassageReviewsBodyRequest } from "../../../type/handler/massage";
import pool from "../../../util/postgres";

export const handleGetSingleReviews = async (
  request: GetSingleMassageReviewsBodyRequest,
  reply: FastifyReply,
) => {
  try {
    const { mt_id } = request.body;
    const client = await pool.connect();
    const { rows, rowCount } = await client.query(
      `
        SELECT * FROM public."ReviewSingleMassage"
        WHERE mt_id = $1;
      `,
      [mt_id]
    );

    client.release();

    if (rowCount == null || rowCount < 1) {
      return reply
        .status(404)
        .send({ error: "No Any Single Massage Technique's Reviews" });
    }

    return reply.status(200).send({
      message: "Fetch Single Massage Technique's Reviews Successfully",
      data: rows,
    });
  } catch (err) {
    return reply
      .status(500)
      .send({
        error: err,
        message: "Can't Fetch Single Massage Technique's Reviews",
      });
  }
};
