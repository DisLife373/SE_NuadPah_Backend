import jwt from "jsonwebtoken";
import { FastifyInstance, FastifyReply } from "fastify";
import { hashPassword } from "../../util/argon2";
import { setSession } from "../../util/session/setSession";
import { AuthSignUpBodyRequest } from "../../type/handler/auth";
import config from "../../config/config";
import pool from "../../util/postgres";

export const handleSignUp = async (
  request: AuthSignUpBodyRequest,
  reply: FastifyReply,
) => {
  try {
    const { email, firstname, lastname, password } = request.body;

    const client = await pool.connect();
    const userQuery = await client.query(
      `
      SELECT * FROM public."User"
      WHERE email = $1;
    `,
      [email]
    );

    if (userQuery.rows.length > 0) {
      return reply.status(403).send({ error: "Already has this user" });
    }

    const hashedPW = await hashPassword(password);
    const { rows } = await client.query(
      `
        INSERT INTO public."User"(
          email, firstname, lastname, password, image_name, role
        ) VALUES ($1, $2, $3, $4, 'user_icon', 'user') RETURNING *;
      `,
      [email, firstname, lastname, hashedPW]
    );

    client.release();

    const token = jwt.sign({ userEmail: rows[0].email }, config.jwt, {
      expiresIn: "1h",
    });

    await setSession(rows[0].email, { status: "active", token }, 3600); // 1 hour

    return reply.status(201).send({ token });
  } catch (e) {
    console.error(e);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
};
