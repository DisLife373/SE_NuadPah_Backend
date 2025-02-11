import { fetch } from "undici";
import config from "../../config/config";
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

  if (!fileResponse.ok) throw new Error("File download failed");

  return {
    body: fileResponse.body,
    contentType: fileResponse.headers.get("content-type"),
  };
};
