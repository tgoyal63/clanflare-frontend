"use client";
import { NavbarAvatar, Steeper, ThemeToggle } from "@/components";
import ProtectedRoute from "@/components/wrappers/ProtectedRote";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useSearchParams();
  const stepNumber = Number(params.get("step"));
  return (
    <main className="flex min-h-full flex-col items-center">
      <nav className="sticky top-0 z-[10] flex w-full items-center border-b bg-card  px-4 py-2 backdrop-blur-md ">
        <Link href="/dashboard" className="mr-auto">
          Authify
        </Link>

        <ul className="flex list-none space-x-4">
          <ThemeToggle />
          <NavbarAvatar />
        </ul>
      </nav>
      <div className="flex h-full w-full flex-col items-center justify-between text-sm">
        <div className="w-full px-3 md:px-10" >
          <Steeper stepNum={stepNumber} />
        </div>
        {/* NAV section */}
        <ProtectedRoute>
          <div className="w-full max-w-[90rem]  p-4 text-sm">{children}</div>
        </ProtectedRoute>
      </div>
    </main>
  );
}

