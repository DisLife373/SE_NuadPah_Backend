import fastify, { FastifyServerOptions } from "fastify";
import fastifyCors from "@fastify/cors";
import multipart from "@fastify/multipart";
import authRouter from "./router/auth";
import massageRouter from "./router/massage";
import adminRouter from "./router/admin";
import imageRouter from "./router/image";

const buildApp = (options: FastifyServerOptions) => {
  const app = fastify(options);

  app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  app.register(multipart);

  app.register(authRouter, { prefix: "/auth" });
  app.register(massageRouter, { prefix: "/massage" });
  app.register(adminRouter, { prefix: "/admin" });
  app.register(imageRouter, { prefix: "/image" });

  app.setErrorHandler((error, request, reply) =>
    reply.status(error.statusCode || 500).send({
      error: {
        message: error.message,
        code: error.code,
      },
    })
  );

  return app;
};

export default buildApp;
