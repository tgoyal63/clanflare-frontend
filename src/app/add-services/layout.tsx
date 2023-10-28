import { NavbarAvatar, ThemeToggle } from "@/components";
import type { Metadata } from "next";
import Link from "next/link";

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
    <main className="flex min-h-screen flex-col items-center">
      {/* NAV section */}
      <nav className="sticky top-0 z-30 flex w-full items-center border-b px-4 py-2 backdrop-blur-md ">
        <Link href="/dashboard" className="mr-auto">
          Authify
        </Link>

        <ul className="flex list-none gap-4 space-x-4">
          <ThemeToggle />
          <NavbarAvatar />
        </ul>
      </nav>

      <div className="w-full max-w-[90rem]  p-4 text-sm">{children}</div>
    </main>
  );
}
