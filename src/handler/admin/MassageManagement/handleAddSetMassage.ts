import { FastifyInstance, FastifyReply } from "fastify";
import { AddSetMassageBodyRequest } from "../../../type/handler/admin";
import pool from "../../../util/postgres";

export const handleAddSetMassage = async (
  request: AddSetMassageBodyRequest,
  reply: FastifyReply,
) => {
  try {
    const { mt_ids, ms_name, ms_type, ms_time, ms_detail, ms_image_names } =
      request.body;

    const client = await pool.connect();
    const { rows } = await client.query(
      `
        INSERT INTO public."MassageSet"(
          mt_ids, ms_name, ms_type, ms_time, ms_detail, ms_image_names
        )
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
      `,
      [mt_ids, ms_name, ms_type, ms_time, ms_detail, ms_image_names]
    );

    client.release();

    return reply
      .status(201)
      .send({ message: "Add Set Massage Successfully", data: rows[0] });
  } catch (err) {
    return reply.status(500).send({ error: "Can't Add Set Massage" });
  }
};
