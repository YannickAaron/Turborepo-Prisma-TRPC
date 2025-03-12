//src/server/api/routers/user.ts
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { userSchema } from "~/types/schemas/user";

export const userRouter = createTRPCRouter({
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany();
    return users;
  }),
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),
  updateUser: protectedProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          id: ctx.session.user.id,
          name: input.name,
          sex: input.sex,
          height: input.height,
          weight: input.weight,
          allergies: input.allergies,
          intolerances: input.intolerances,
          inmunizationHistory: input.inmunizationHistory,
          insuranceinfo: input.insuranceInfo,
          familyHistory: input.familyHistory,
          lifestyle: input.lifestyle,
          emergencyContact: input.emergencyContact,
        },
      });
    }),
});
