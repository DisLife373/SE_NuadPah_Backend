import Redis from "ioredis";
import config from "../config/config";

const redis = new Redis({
  host: config.redisHost || "redis",
  port: config.redisPort || 6379,
});

redis.on("connect", () => {
  console.log("Redis connected successfully");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redis;
