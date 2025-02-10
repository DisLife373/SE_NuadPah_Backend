import { FastifyInstance, FastifyReply } from "fastify";
import { hashPassword } from "../../util/argon2";
import { AuthResetPWBodyRequest } from "../../type/handler/auth";

export const handleResetPW = async (
  request: AuthResetPWBodyRequest,
  reply: FastifyReply,
  app: FastifyInstance
) => {
  try {
    const { email, newpw, confirmpw } = request.body;

    if (newpw != confirmpw) {
      return reply.status(403);
    }

    const hashedPW = await hashPassword(newpw);

    const client = await app.pg.connect();
    const { rows } = await client.query(
      `
        UPDATE public."User"
        SET password = $1
        WHERE email = $2;
    `,
      [hashedPW, email]
    );

    client.release();

    return reply.status(200).send({ message: "Password is updated" });
  } catch (e) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
};
