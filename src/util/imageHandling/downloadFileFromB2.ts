import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../backblaze_b2";

export const downloadFileFromB2 = async (
  fileName: string,
  bucketName: string
): Promise<{ body: any; contentType: string | undefined }> => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    });

    const { Body, ContentType } = await s3Client.send(command);

    if (!Body) {
      throw new Error("File not found");
    }

    return { body: Body, contentType: ContentType };
  } catch (error) {
    console.error("B2 Download Error:", error);
    throw new Error("File download failed");
  }
};
