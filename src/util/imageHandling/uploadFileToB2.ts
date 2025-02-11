import { fetch } from "undici";
import { getUploadURL } from "./getUploadURL";

export const uploadFileToB2 = async (
  file: { filename: string; mimetype: string; data: Buffer },
  bucketName: string
) => {
  const uploadUrlData: any = await getUploadURL();

  console.log("Get Upload URL!");
  console.log("------------------------------------------------------------");

  const uploadResponse = await fetch(uploadUrlData.uploadUrl, {
    method: "POST",
    headers: {
      Authorization: uploadUrlData.authorizationToken,
      "X-Bz-File-Name": encodeURIComponent(file.filename),
      "Content-Type": file.mimetype,
      "X-Bz-Content-Sha1": "do_not_verify",
    },
    body: file.data,
  });

  console.log("Get Upload Response!");
  console.log("------------------------------------------------------------");

  if (!uploadResponse.ok) throw new Error("File upload failed");
  const uploadResult = await uploadResponse.json();

  return `${uploadUrlData.downloadUrl}/file/${bucketName}/${file.filename}`;
};
