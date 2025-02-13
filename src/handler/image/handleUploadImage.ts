import { FastifyReply } from "fastify";
import config from "../../config/config";
import { uploadFileToB2 } from "../../util/imageHandling/uploadFileToB2";

export const handleUploadImage = async (request: any, reply: FastifyReply) => {
  const data = await request.file();
  if (!data) {
    return reply.status(400).send({ message: "No file uploaded" });
  }

  const buffer = await data.toBuffer();
  const fileData = {
    filename: data.filename,
    mimetype: data.mimetype,
    data: buffer,
  };

  try {
    const { fileName } = await uploadFileToB2(fileData, config.bb_bucket_name);
    return reply
      .status(201)
      .send({ message: "File upload Success!", data: fileName });
  } catch (err) {
    return reply
      .status(500)
      .send({ error: err || err, message: "Upload failed (Handler)" });
  }
};
