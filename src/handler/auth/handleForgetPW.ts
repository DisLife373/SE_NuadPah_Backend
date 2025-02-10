import { FastifyInstance, FastifyReply } from "fastify";
import { AuthForgetPWBodyRequest } from "../../type/handler/auth";
import crypto from "crypto";
import { sendEmail } from "../../util/nodemalier";

export const handleForgetPW = async (
  request: AuthForgetPWBodyRequest,
  reply: FastifyReply,
  app: FastifyInstance
) => {
  try {
    const emailForget = request.body.email;
    const client = await app.pg.connect();
    const userQuery = await client.query(
      `
      SELECT * FROM public."User"
      WHERE email = $1;
    `,
      [emailForget]
    );

    client.release();

    if (userQuery.rows.length != 1) {
      return reply.status(404).send({
        message: "Email is not found",
      });
    }

    const otp = crypto.randomInt(1000, 9999).toString();
    const expiresAt = new Date(Date.now() + 1 * 60 * 1000); // (Date.now() + minute(s) * toMinute * toSec)
    const { rows } = await client.query(
      `
            INSERT INTO public."OTP" (email, otp, expired_at)
            VALUES ($1, $2, $3);
        `,
      [emailForget, otp, expiresAt]
    );

    client.release();

    await sendEmail(emailForget, `Your OTP is ${otp}.`);

    return reply.status(201).send({
      message: "OTP is already sent, Please check your Email",
    });
  } catch (e) {
    console.error(e);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
};
