import { fetch } from "undici";
import { authorizeB2 } from "./authorizeB2";

export const downloadFileFromB2 = async (
  fileName: string,
  bucketName: string
) => {
  const authData: any = await authorizeB2();

  const fileUrl = `${authData.downloadUrl}/file/${bucketName}/${fileName}`;
  const fileResponse = await fetch(fileUrl, {
    method: "GET",
    headers: { Authorization: authData.authorizationToken },
  });

  if (fileResponse.status != 200) throw new Error("File download failed");

  const buffer = Buffer.from(await fileResponse.arrayBuffer());

  return {
    body: buffer,
    contentType: fileResponse.headers.get("content-type"),
  };
};
