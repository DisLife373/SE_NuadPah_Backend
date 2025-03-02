import { FastifyInstance, FastifyReply } from "fastify";
import { DeleteSetMassageParamsRequest } from "../../../type/handler/admin";
import pool from "../../../util/postgres";

export const handleDeleteSetMassage = async (
  request: DeleteSetMassageParamsRequest,
  reply: FastifyReply,
) => {
  try {
    const { ms_id } = request.params;
    const client = await pool.connect();
    const { rows } = await client.query(
      `
        DELETE FROM public."MassageSet"
	    WHERE ms_id = $1 RETURNING *;
      `,
      [ms_id]
    );

    client.release();

    return reply
      .status(200)
      .send({ message: "Delete Set Massage Successfully", data: rows[0] });
  } catch (err) {
    return reply.status(500).send({ error: "Can't Delete Set Massage" });
  }
};
