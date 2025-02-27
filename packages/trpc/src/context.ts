import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { prisma } from '@repo/db';
import type {CreateExpressContextOptions} from "@trpc/server/adapters/express";

/**
 * Creates the context for tRPC by extracting the request and response objects from the Express context options.
 */
export const createContext = ({
  prisma,
  req,
  res,
}: CreateExpressContextOptions) => ({});

export type Context = ReturnType<typeof createContext>;
