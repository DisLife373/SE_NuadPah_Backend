import { fetch } from "undici";
import config from "../../config/config";
import { authorizeB2 } from "./authorizeB2";

export const getUploadURL = async () => {
  const authData: any = await authorizeB2();

  const response = await fetch(
    `${authData.apiUrl}/b2api/v2/b2_get_upload_url?bucketId=${config.bb_bucket_id}`,
    {
      method: "GET",
      headers: { Authorization: authData.authorizationToken },
    }
  );

  const data: any = await response.json();

  if (response.status != 200) throw new Error("Failed to get upload URL");

  return {
    downloadUrl: authData.downloadUrl,
    authorizationToken: data.authorizationToken,
    uploadUrl: data.uploadUrl,
  };
};
