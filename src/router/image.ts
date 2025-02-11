// src/router/image.ts
import { FastifyInstance, FastifyReply } from "fastify";
import { handleUploadImage } from "../handler/image/handleUploadImage";
import { handleDownloadImage } from "../handler/image/handleDownloadImage";

const imageRouter = async (app: FastifyInstance) => {
  // Upload image
  app.post("/upload", async (request: any, reply: FastifyReply) => {
    const result = await handleUploadImage(request, reply);
    reply.send(result);
  });

  // Download image
  app.get("/download/:fileName", async (request: any, reply: FastifyReply) => {
    const result = await handleDownloadImage(request, reply);
    reply.send(result);
  });
};

export default imageRouter;
