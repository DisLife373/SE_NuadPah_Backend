import * as dotenv from "dotenv";

dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 3000,
  db: process.env.DATABASE_URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  jwt: process.env.JWT_SECRET || "nuad_pah_comsci",
  mail_user: process.env.EMAIL_USER,
  mail_pw: process.env.EMAIL_PASSWORD,
  redisHost: process.env.REDIS_HOST || "redis",
  redisPort: parseInt(process.env.REDIS_PORT || "6379", 10),
};

export default config;
