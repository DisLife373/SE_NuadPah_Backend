import { FastifyInstance, FastifyReply } from "fastify";
import { SingleMassageDetailBodyRequest } from "../../../type/handler/massage";
import pool from "../../../util/postgres";

export const handleGetSingleDetail = async (
  request: SingleMassageDetailBodyRequest,
  reply: FastifyReply,
) => {
  try {
    const { mt_id } = request.body;
    const client = await pool.connect();
    const { rows, rowCount } = await client.query(
      `
        SELECT * FROM public."MassageTechnique"
        WHERE mt_id = $1;
      `,
      [mt_id]
    );

    client.release();

    if (rowCount == null || rowCount < 1) {
      return reply
        .status(404)
        .send({ error: "This Single Massage Technique is not exist !" });
    }
    return reply.status(200).send({
      message: "Fetch Single Massage Technique Successfully",
      data: rows[0],
    });
  } catch (err) {
    return reply
      .status(500)
      .send({ error: err, message: "Can't Find Single Massage Technique" });
  }
};
