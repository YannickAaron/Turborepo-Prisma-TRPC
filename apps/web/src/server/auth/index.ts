import { cache } from "react";
import NextAuth, { NextAuthResult } from "next-auth";

import { authConfig } from "./config";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

const auth = cache(uncachedAuth) as NextAuthResult["auth"];

export { auth, handlers, signIn, signOut };
