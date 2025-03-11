import type { AppRouter } from "~/server/api/root";
import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import superjson from "superjson";

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

// Function to create a new QueryClient with default options
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: true,
      },
      mutations: {
        onSuccess: () => {
          // We can access the queryClient directly from the closure
          const queryClient = getQueryClient();
          queryClient.invalidateQueries();
        },
      },
    },
  });
}

// Singleton pattern for browser QueryClient
let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof globalThis === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

// Create the tRPC client
export function getTrpcClient() {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "/api/trpc",
        transformer: superjson,
      }),
    ],
  });
}
