"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const queryClient = new QueryClient();

/** a QueryClientProvider client wrapper  */
export default function QueryProvider({ children }: Props) {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
