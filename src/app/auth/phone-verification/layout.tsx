import { ThemeToggle } from "@/components";
import { Card } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add new services",
  description: "Add new services to your dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="fixed  left-1/2 top-1/2 w-full max-w-md translate-x-[-50%] translate-y-[-50%]">
      <div className="mb-2 flex w-full  justify-end gap-2">
        <ThemeToggle />
      </div>
      <Card className="w-full border-0 p-4  sm:p-4 ">{children}</Card>
    </main>
  );
}
