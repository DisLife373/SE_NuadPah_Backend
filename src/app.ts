import fastify, { FastifyServerOptions } from "fastify";
import fastifyCors from "@fastify/cors";
import authRouter from "./router/auth";
import massageRouter from "./router/massage";
import adminRouter from "./router/admin";
import pool from "./util/postgres";

const buildApp = (options: FastifyServerOptions) => {
  const app = fastify(options);

  // Register CORS plugin
  app.register(fastifyCors, {
    origin: "*", // Allow all origins. Adjust this as needed for your use case.
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  });

  app.decorate("pg", pool);

  app.register(authRouter, { prefix: "/auth" });
  app.register(massageRouter, { prefix: "/massage" });
  app.register(adminRouter, { prefix: "/admin" });

  app.ready(() => {
    app.printRoutes();
  });

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
