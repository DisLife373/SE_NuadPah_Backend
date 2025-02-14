import { FastifyInstance, FastifyReply } from "fastify";
import { EditUserBodyRequest } from "../../../type/handler/admin";
import { hashPassword } from "../../../util/argon2";
import pool from "../../../util/postgres";

export const handleUserEdit = async (
  request: EditUserBodyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const { email, firstname, lastname, password, image_name } = request.body;

    const convID: number = Number(id);
    const hashedPW = await hashPassword(password);

    const client = await pool.connect();
    const { rows } = await client.query(
      `
        UPDATE public."User"
        SET email = $1, firstname = $2, lastname = $3, password = $4, image_name = $5
        WHERE id = $6 RETURNING *;
      `,
      [email, firstname, lastname, hashedPW, image_name, id]
    );

    client.release();

    return reply
      .status(200)
      .send({ message: "Edit User Information Successfully", data: rows[0] });
  } catch (err) {
    return reply.status(500).send({ error: "Can't Edit User" });
  }
};
