import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../backblaze_b2";

export const uploadFileToB2 = async (
  file: { filename: string; mimetype: string; data: Buffer },
  bucketName: string
): Promise<string> => {
  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: file.filename,
      Body: file.data,
      ContentType: file.mimetype,
    });

    await s3Client.send(command);

    // Generate the file URL
    return `${process.env.B2_ENDPOINT}/${bucketName}/${file.filename}`;
  } catch (error) {
    console.error("B2 Upload Error:", error);
    throw new Error("File upload failed");
  }
};
