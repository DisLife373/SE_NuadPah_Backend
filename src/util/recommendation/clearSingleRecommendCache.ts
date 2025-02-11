import redis from "../redis";

export const clearSingleRecommendCache = async (userID: number) => {
  await redis.del(`single_recommendations:${userID}`);
  await redis.del(`single_recommendations_hash:${userID}`);
};
