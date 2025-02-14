import { FastifyReply } from "fastify";
import pool from "../../../util/postgres";

export const handleGetUserList = async (reply: FastifyReply) => {
  try {
    const client = await pool.connect();
    const { rows, rowCount } = await client.query(
      `
        SELECT * FROM public."User" ORDER BY id;
      `
    );

    client.release();

    if (rowCount == null || rowCount < 1) {
      return reply.status(404).send({ error: "User is not exist !" });
    }

    return reply.status(200).send({
      message: "Fetch Users Successfully",
      data: rows,
    });
  } catch (err) {
    return reply.status(500).send({
      error: err,
      message: "Can't Find any Users",
    });
  }
};
