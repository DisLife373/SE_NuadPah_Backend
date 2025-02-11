import { FastifyInstance, FastifyReply } from "fastify";
import { DeleteSingleMassageParamsRequest } from "../../../type/handler/admin";
import pool from "../../../util/postgres";

export const handleDeleteSingleMassage = async (
  request: DeleteSingleMassageParamsRequest,
  reply: FastifyReply,
) => {
  try {
    const { mt_id } = request.params;
    const client = await pool.connect();
    const { rows } = await client.query(
      `
        DELETE FROM public."MassageTechnique"
	    WHERE mt_id = $1 RETURNING *;
      `,
      [mt_id]
    );

    client.release();
    
    return reply
      .status(200)
      .send({ message: "Delete Single Massage Successfully", data: rows[0] });
  } catch (err) {
    return reply.status(500).send({ error: "Can't Delete Single Massage" });
  }
};
