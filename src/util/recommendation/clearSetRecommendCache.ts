import redis from "../redis";

export const clearSetRecommendCache = async (userID: number) => {
  await redis.del(`set_recommendations:${userID}`);
  await redis.del(`set_recommendations_hash:${userID}`);
};
