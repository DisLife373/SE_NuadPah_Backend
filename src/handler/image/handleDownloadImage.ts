import { FastifyReply } from "fastify";
import config from "../../config/config";
import { downloadFileFromB2 } from "../../util/imageHandling/downloadFileFromB2";

export const handleDownloadImage = async (
  request: any,
  reply: FastifyReply
) => {
  const { fileName } = request.params;

  try {
    const { body, contentType } = await downloadFileFromB2(
      fileName,
      config.bb_bucket_name
    );

    return reply
      .header("Content-Type", contentType)
      .header("Content-Disposition", `attachment; filename="${fileName}"`)
      .status(200)
      .send(body); // Recieve as Uint8List in Flutter
  } catch (err) {
    return reply
      .status(500)
      .send({ error: err, message: "File download failed (Handler)" });
  }
};
