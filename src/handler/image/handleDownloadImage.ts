import { FastifyReply } from "fastify";
import config from "../../config/config";
import { DownloadParamRequest } from "../../type/handler/image";
import { downloadFileFromB2 } from "../../util/imageHandling/downloadFileFromB2";

export const handleDownloadImage = async (
  request: DownloadParamRequest,
  reply: FastifyReply
) => {
  const { fileName } = request.params;

  try {
    const { body, contentType } = await downloadFileFromB2(
      fileName,
      config.bb_bucket_name
    );

    reply.header("Content-Type", contentType || "application/octet-stream");
    return reply
      .status(200)
      .send({ message: "File download Success!", data: body });
  } catch (err) {
    return reply
      .status(500)
      .send({ error: err, message: "File download failed" });
  }
};
