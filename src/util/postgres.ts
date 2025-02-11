import { Pool } from "pg";
import config from "../config/config";

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.db_name,
  password: config.password,
  port: 5432,
});

export default pool;
