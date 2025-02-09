import Redis from "ioredis";
import config from "../config/config";

const redis = new Redis({
  host: config.host || "127.0.0.1",
  port: 6379,
});

redis.on("connect", () => {
  console.log("Redis connected successfully");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redis;
