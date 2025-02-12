import { fetch } from "undici";
import config from "../../config/config";

export const authorizeB2 = async () => {
  const credentials = `${config.bb_account_id}:${config.bb_account_key}`;
  const encodedCredentials = Buffer.from(credentials).toString("base64");

  const response = await fetch(
    "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    }
  );

  const result = await response.json();

  if (response.status != 200) throw new Error("Failed to authorize with B2");
  return result;
};
