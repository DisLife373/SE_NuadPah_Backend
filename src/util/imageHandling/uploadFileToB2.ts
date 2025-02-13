import { fetch } from "undici";
import { getUploadURL } from "./getUploadURL";
import { genFileName } from "./genFileName";

export const uploadFileToB2 = async (
  file: { filename: string; mimetype: string; data: Buffer },
  bucketName: string
) => {
  const uploadUrlData: any = await getUploadURL();

  const fileName = genFileName(file.filename);

  const uploadResponse = await fetch(uploadUrlData.uploadUrl, {
    method: "POST",
    headers: {
      Authorization: uploadUrlData.authorizationToken,
      "X-Bz-File-Name": encodeURIComponent(fileName),
      "Content-Type": file.mimetype,
      "X-Bz-Content-Sha1": "do_not_verify",
    },
    body: file.data,
  });

  console.log(uploadResponse.status);

  if (uploadResponse.status != 200) throw new Error("File upload failed");

  return { fileName: fileName };
};
