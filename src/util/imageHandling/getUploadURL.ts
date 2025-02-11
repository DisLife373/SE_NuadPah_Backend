import { fetch } from "undici";
import config from "../../config/config";
import { authorizeB2 } from "./authorizeB2";

export const getUploadURL = async () => {
  const authData: any = await authorizeB2();

  console.log(authData);
  console.log("------------------------------------------------------------");

  //   const response = await fetch(
  //     `${authData.apiUrl}/b2api/v2/b2_get_upload_url`,
  //     {
  //       method: "POST",
  //       headers: { Authorization: authData.authorizationToken },
  //       body: JSON.stringify({ bucketId: config.bb_bucket_id }),
  //     }
  //   );

  //   console.log("Recieve Upload URL!");
  //   console.log("------------------------------------------------------------");

  //   if (!response.ok) throw new Error("Failed to get upload URL");
  //   return response.json();
  return {};
};
