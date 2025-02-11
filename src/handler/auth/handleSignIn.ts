import jwt from "jsonwebtoken";
import { FastifyReply } from "fastify";
import { verifyPassword } from "../../util/argon2";
import { setSession } from "../../util/session/setSession";
import { AuthSignInBodyRequest } from "../../type/handler/auth";
import config from "../../config/config";
import pool from "../../util/postgres";

export const handleSignIn = async (
  request: AuthSignInBodyRequest,
  reply: FastifyReply
) => {
  try {
    const { email, password } = request.body;

    const client = await pool.connect();
    const { rows, rowCount } = await client.query(
      `
      SELECT * FROM public."User"
      WHERE email = $1;
    `,
      [email]
    );

    client.release();

    if (rowCount != 1) {
      return reply.status(400).send({ error: "Invalid email or password" });
    }

    const hashedPW = rows[0].password;
    const isMatch = await verifyPassword(password, hashedPW);
    // const isMatch = true;

    console.log(`isMatch: ${isMatch}`);

    if (!isMatch) {
      return reply.status(400).send({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userEmail: rows[0].email, userRole: rows[0].role },
      config.jwt,
      {
        expiresIn: "1h",
      }
    );

    await setSession(rows[0].email, { status: "active", token }, 3600); // 1 hour

    return reply.status(201).send({ token });
  } catch (e) {
    console.error(e);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
};
