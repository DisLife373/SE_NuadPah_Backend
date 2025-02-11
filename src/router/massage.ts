import { FastifyInstance, FastifyReply } from "fastify";
import {
  SingleMassageDetailBodyRequest,
  SetMassageDetailBodyRequest,
  GetSingleMassageReviewsBodyRequest,
  GetSetMassageReviewsBodyRequest,
  ReviewSingleMassageBodyRequest,
  ReviewSetMassageBodyRequest,
  RecordSingleMassageBodyRequest,
  RecordSetMassageBodyRequest,
  RecommendMassageBodyRequest,
} from "../type/handler/massage";
import { handleGetSingleDetail } from "../handler/massage/MassageInfo/handleGetSingleDetail";
import { handleGetSetDetail } from "../handler/massage/MassageInfo/handleGetSetDetail";
import { handleGetSingleLists } from "../handler/massage/MassageInfo/handleGetSingleLists";
import { handleGetSetLists } from "../handler/massage/MassageInfo/handleGetSetLists";
import { handleGetSingleReviews } from "../handler/massage/Reviews/handleGetSingleReviews";
import { handleGetSetReviews } from "../handler/massage/Reviews/handleGetSetReviews";
import { handleReviewSingleMassage } from "../handler/massage/Reviews/handleReviewSingleMassage";
import { handleReviewSetMassage } from "../handler/massage/Reviews/handleReviewSetMassage";
import { handleRecordSingleMassage } from "../handler/massage/Records/handleRecordSingleMassage";
import { handleRecordSetMassage } from "../handler/massage/Records/handleRecordSetMassage";
import { handleSingleRecommend } from "../handler/massage/Recommend/handleSingleRecommend";
import { handleSetRecommend } from "../handler/massage/Recommend/handleSetRecommend";

const massageRouter = async (app: FastifyInstance) => {
  // Fetch List of Single Massage Techniques
  app.get("/single-list", async (request: any, reply: FastifyReply) => {
    const result = await handleGetSingleLists(reply);
    reply.send(result);
  });

  // Fetch List of Set Massage Techniques (not mapped)
  app.get("/set-list", async (request: any, reply: FastifyReply) => {
    const result = await handleGetSetLists(reply);
    reply.send(result);
  });

  // Get Detail of Single Massage Technique
  app.post(
    "/single-detail",
    async (request: SingleMassageDetailBodyRequest, reply: FastifyReply) => {
      const result = await handleGetSingleDetail(request, reply);
      reply.send(result);
    }
  );

  // Get Detail of Set Massage Technique
  app.post(
    "/set-detail",
    async (request: SetMassageDetailBodyRequest, reply: FastifyReply) => {
      const result = await handleGetSetDetail(request, reply);
      reply.send(result);
    }
  );

  // Get List of Single Massage Technique's Reviews
  app.post(
    "/single-reviews",
    async (
      request: GetSingleMassageReviewsBodyRequest,
      reply: FastifyReply
    ) => {
      const result = await handleGetSingleReviews(request, reply);
      reply.send(result);
    }
  );

  // Get List of Set Massage Technique's Reviews
  app.post(
    "/set-reviews",
    async (request: GetSetMassageReviewsBodyRequest, reply: FastifyReply) => {
      const result = await handleGetSetReviews(request, reply);
      reply.send(result);
    }
  );

  // Send a Review of Single Massage Technique after ending the learning session
  app.post(
    "/review-single",
    async (request: ReviewSingleMassageBodyRequest, reply: FastifyReply) => {
      const result = await handleReviewSingleMassage(request, reply);
      reply.send(result);
    }
  );

  // Send a Review of Set Massage Technique after ending the learning session
  app.post(
    "/review-set",
    async (request: ReviewSetMassageBodyRequest, reply: FastifyReply) => {
      const result = await handleReviewSetMassage(request, reply);
      reply.send(result);
    }
  );

  // Record Single Massage Technique to History after ending the learning session
  app.post(
    "/record-single",
    async (request: RecordSingleMassageBodyRequest, reply: FastifyReply) => {
      const result = await handleRecordSingleMassage(request, reply);
      reply.send(result);
    }
  );

  // Record Set Massage Technique to History after ending the learning session
  app.post(
    "/record-set",
    async (request: RecordSetMassageBodyRequest, reply: FastifyReply) => {
      const result = await handleRecordSetMassage(request, reply);
      reply.send(result);
    }
  );

  app.post(
    "/single-recommend",
    async (request: RecommendMassageBodyRequest, reply: FastifyReply) => {
      const result = await handleSingleRecommend(request, reply);
      reply.send(result);
    }
  );

  // Record Set Massage Technique to History after ending the learning session
  app.post(
    "/set-recommend",
    async (request: RecommendMassageBodyRequest, reply: FastifyReply) => {
      const result = await handleSetRecommend(request, reply);
      reply.send(result);
    }
  );
};

export default massageRouter;
