import { S3Client } from "@aws-sdk/client-s3";
import config from "../config/config";

export const s3Client = new S3Client({
  endpoint: config.bb_endpoint,
  region: config.bb_region,
  // forcePathStyle: true,
  credentials: {
    accessKeyId: config.bb_access_key,
    secretAccessKey: config.bb_secret_key,
  },
});
