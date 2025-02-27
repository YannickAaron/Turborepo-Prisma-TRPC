import {   router } from "../trpc";
import { publicProcedure } from "../procedures";

const helloRouter = router({
  sayHello: publicProcedure.query(({ ctx }) => {
    console.log(ctx)
    return { greet: `Hello World!` };
  }),
});

export const appRouter = router({
  hello: helloRouter,
})
export type AppRouter = typeof appRouter;