import React from "react";
import type { Metadata } from "next";
import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

import UserProfile from "~/components/profile/user-profile";

export default async function Page(): Promise<React.JSX.Element> {
  const context = await createTRPCContext({ headers: new Headers() });
  const caller = createCaller(context);

  const user = await caller.user.getUser();

  return <UserProfile user={user} />;
}
