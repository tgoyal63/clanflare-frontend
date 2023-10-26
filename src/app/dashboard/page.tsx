import { CardDashboard, NavbarAvatar, ThemeToggle } from "@/components";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashBoard() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* NAV section */}
      <nav className="sticky top-0 z-[10] flex w-full items-center border-b px-4 py-2 backdrop-blur-md ">
        <Link href="/dashboard" className="mr-auto">
          Authify
        </Link>

        <ul className="flex list-none space-x-4">
          <ThemeToggle />
          <NavbarAvatar />
        </ul>
      </nav>
      {/* Body */}
      <div className="w-full max-w-[90rem]  p-4 text-sm">
        <div>
          <div className="sm:grid-cols-3 md:grid lg:grid-cols-4">
            <Link
              className="cols-span-1 flex h-28 w-full flex-col items-center justify-center gap-2 rounded-md border bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:scale-105 active:scale-100"
              href={"/addNewServer"}
            >
              <Plus className="mr-2 text-white" />
              <span className="block text-white">Add new Service</span>
            </Link>
          </div>

          <section className="mt-5  sm:flex">
            <h1 className="mb-2 mr-auto text-2xl sm:mb-0">All servers</h1>
          </section>
          <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((item: any, index) => {
              return <CardDashboard key={index} variant="default" />;
            })}
          </section>
        </div>
      </div>
    </main>
  );
}
