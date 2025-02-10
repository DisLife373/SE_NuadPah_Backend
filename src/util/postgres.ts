import { Pool } from "pg";
import config from "../config/config";

const pool = new Pool({
  connectionString: config.db,
});

pool.on("connect", () => {
  console.log("PostgreSQL connected successfully");
});

pool.on("error", (err) => {
  console.error("PostgreSQL connection error:", err);
});

export default pool;
