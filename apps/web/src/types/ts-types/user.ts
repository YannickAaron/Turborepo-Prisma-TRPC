import { AppRouter } from "~/server/api/root";
import { inferProcedureOutput } from "@trpc/server";
import { z } from "zod";

import { userSchema } from "~/types/schemas/user";

export type UserInferredType = inferProcedureOutput<
  AppRouter["user"]["getUser"]
>;
export type UserFormValues = z.infer<typeof userSchema>;
