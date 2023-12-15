"use client";
import { Steeper } from "@/components";
import { useSearchParams } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useSearchParams();
  const stepNumber = params.get("step");
  return (
    <>
      <div className="flex h-full flex-col items-center justify-between text-sm">
        <Steeper stepNum={Number(stepNumber)} />
        {children}
      </div>
    </>
  );
}
