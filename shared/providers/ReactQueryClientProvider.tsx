"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

/**
 * React Query provider for client components.
 * Wrap your app or subtree with this provider to enable React Query context.
 */
export default function ReactQueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
