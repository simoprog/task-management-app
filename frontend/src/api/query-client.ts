import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time - how long data is considered fresh
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Cache time - how long data stays in cache after being unused
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

      // Refetch on window focus (can be disabled for better UX)
      refetchOnWindowFocus: false,

      // Refetch on reconnect
      refetchOnReconnect: true,
    },
  },
});
