import { fetch } from "undici";
import config from "../../config/config";

export const authorizeB2 = async () => {
  const response = await fetch(
    "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${config.bb_account_id}:${config.bb_account_key}`
        ).toString("base64")}`,
      },
    }
  );

  console.log("Authorize with B2 Success!");
  console.log("------------------------------------------------------------");

  const result = await response.json();
  console.log(result);

  if (!response.ok) throw new Error("Failed to authorize with B2");
  return result;
};
