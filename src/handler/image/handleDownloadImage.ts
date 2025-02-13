import { FastifyReply } from "fastify";
import config from "../../config/config";
import { downloadFileFromB2 } from "../../util/imageHandling/downloadFileFromB2";

export const handleDownloadImage = async (
  request: any,
  reply: FastifyReply
) => {
  const { fileName } = request.params;

  try {
    const { downloadUrl } = await downloadFileFromB2(
      fileName,
      config.bb_bucket_name
    );

    return reply
      .status(200)
      .send({ message: "File download Success!", data: downloadUrl });
  } catch (err) {
    return reply
      .status(500)
      .send({ error: err, message: "File download failed (Handler)" });
  }
};
