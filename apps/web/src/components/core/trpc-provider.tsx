"use client";

import React, { useState, type PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { getQueryClient, getTrpcClient, TRPCProvider } from "~/lib/trpc";

export function TrpcClientProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() => getTrpcClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
