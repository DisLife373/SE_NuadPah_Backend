import { FastifyInstance, FastifyReply } from "fastify";
import { DownloadParamRequest } from "../type/handler/image";
import { handleUploadImage } from "../handler/image/handleUploadImage";
import { handleDownloadImage } from "../handler/image/handleDownloadImage";

const imageRouter = async (app: FastifyInstance) => {
  // Sign In
  app.post("/upload", async (request: any, reply: FastifyReply) => {
    const result = await handleUploadImage(request, reply);
    reply.send(result);
  });

  // Sign Up
  app.post(
    "/download/:fileName",
    async (request: DownloadParamRequest, reply: FastifyReply) => {
      const result = await handleUploadImage(request, reply);
      reply.send(result);
    }
  );
};

export default imageRouter;
