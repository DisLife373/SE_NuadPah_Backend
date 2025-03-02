import { FastifyInstance, FastifyReply } from "fastify";
import pool from "../../../util/postgres";

export const handleGetSingleLists = async (reply: FastifyReply) => {
  try {
    const client = await pool.connect();
    const { rows, rowCount } = await client.query(
      `
        SELECT * FROM public."MassageTechnique" ORDER BY mt_id;
      `
    );

    client.release();

    if (rowCount == null || rowCount < 1) {
      return reply
        .status(404)
        .send({ error: "Any Single Massage Technique is not exist !" });
    }

    return reply.status(200).send({
      message: "Fetch Single Massage Techniques Successfully",
      data: rows,
    });
  } catch (err) {
    return reply.status(500).send({
      error: err,
      message: "Can't Find Single Massage Technique",
    });
  }
};
