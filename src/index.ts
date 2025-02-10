import { FastifyServerOptions } from "fastify";
import BuildApp from "./app";
import config from "./config/config";

const options: FastifyServerOptions = {
  logger: true,
};

const app = BuildApp(options);
app.listen(
  { port: Number(config.port), host: process.env.HOST || "0.0.0.0" },
  (err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    } else {
      console.log(`[ ready ] http://${config.host}:${config.port}`);
    }
  }
);
