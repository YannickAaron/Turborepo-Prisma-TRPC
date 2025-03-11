import { prisma } from "@repo/db";
import { createTRPCContext } from "~/server/api/trpc";
import { createCaller } from "~/server/api/root";

export default async function IndexPage() {
  //direct prisma query
  const users = await prisma.user.findMany();

  //trpc query
  const context = await createTRPCContext({ headers: new Headers() });
  const caller = createCaller(context);

  const trpc_users = await caller.user.getAllUsers();

  return (
    <div>
      <h1>Prisma Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <h1>Trpc Users</h1>
      <pre>{JSON.stringify(trpc_users, null, 2)}</pre>
    </div>
  );
}
