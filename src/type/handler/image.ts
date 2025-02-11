import { FastifyRequest } from "fastify";

export type DownloadParamRequest = FastifyRequest<{
  Params: {
    fileName: string;
  };
}>;
