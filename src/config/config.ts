import * as dotenv from "dotenv";

dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 3000,
  db: process.env.DATABASE_URL!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  db_name: process.env.DB_NAME!,
  jwt: process.env.JWT_SECRET || "nuad_pah_comsci",
  mail_user: process.env.EMAIL_USER!,
  mail_pw: process.env.EMAIL_PASSWORD!,
  redisHost: process.env.REDIS_HOST || "redis",
  redisPort: parseInt(process.env.REDIS_PORT || "6379", 10),
  bb_account_id: process.env.B2_ACCOUNT_ID!,
  bb_account_key: process.env.B2_ACCOUNT_KEY!,
  bb_application_id: process.env.B2_ACCOUNT_ID!,
  bb_application_key: process.env.B2_ACCOUNT_KEY!,
  bb_application_name: process.env.B2_ACCOUNT_NAME!,
  bb_bucket_id: process.env.B2_BUCKET_ID!,
  bb_bucket_name: process.env.B2_BUCKET_NAME!,
  bb_access_key: process.env.B2_ACCESS_KEY!,
  bb_secret_key: process.env.B2_SECRET_KEY!,
  bb_region: process.env.B2_REGION!,
  bb_endpoint: process.env.B2_ENDPOINT!,
};

export default config;
