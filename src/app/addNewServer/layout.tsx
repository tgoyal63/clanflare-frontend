import { NavbarAvatar } from "@/components";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

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
      <nav className="flex backdrop-blur-md border-b w-full items-center px-4 py-2 sticky top-0 ">
        <Link href="/dashboard" className="mr-auto">
          Logo
        </Link>

        <ul className="flex list-none space-x-4">
          <NavbarAvatar />
        </ul>
      </nav>
      <div className="w-full max-w-[90rem] font-mono text-sm p-4">
        {children}
      </div>
    </main>
  );
}
