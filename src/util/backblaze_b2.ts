import { S3Client } from "@aws-sdk/client-s3";
import config from "../config/config";

export const s3Client = new S3Client({
  region: config.bb_region,
  endpoint: config.bb_endpoint,
  credentials: {
    accessKeyId: config.bb_access_key,
    secretAccessKey: config.bb_secret_key,
  },
});
