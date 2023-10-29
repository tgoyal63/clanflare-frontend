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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 flex h-screen w-full  max-w-lg flex-col items-center justify-center p-2 text-sm">
        <div className="mb-2 flex w-full  justify-end gap-2">
          <ThemeToggle />
        </div>
        <Card className="mx-5 mb-48 w-full  border-0 p-4 sm:mb-0 sm:w-full  sm:border sm:p-4 sm:px-6 sm:shadow-md md:p-6">
          {children}
        </Card>
      </div>
    </main>
  );
}
