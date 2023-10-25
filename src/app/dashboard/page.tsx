import { CardDashboard, NavbarAvatar, ThemeToggle } from "@/components";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashBoard() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* NAV section */}
      <nav className="flex z-[10] backdrop-blur-md border-b w-full items-center px-4 py-2 sticky top-0 ">
        <Link href="/dashboard" className="mr-auto">
          Logo
        </Link>

        <ul className="flex list-none space-x-4">
          <ThemeToggle />
          <NavbarAvatar />
        </ul>
      </nav>
      {/* Body */}
      <div className="w-full max-w-[90rem] font-mono text-sm p-4">
        <div>
          <div className="md:grid sm:grid-cols-3 lg:grid-cols-4">
            <Link className="cols-span-1" href={"/addNewServer"}>
              <Button className="h-28 w-full hover:scale-105 active:scale-100 flex-col gap-2 border bg-gradient-to-br from-red-600 to-purple-600">
                <Plus className="mr-2" />
                <span className="block">Add new Server</span>
              </Button>
            </Link>
          </div>

          <section className="sm:flex  mt-5">
            <h1 className="text-2xl mr-auto mb-2 sm:mb-0">All servers</h1>
          </section>
          <section className="grid mt-4 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((item: any, index) => {
              return <CardDashboard key={index} variant="default" />;
            })}
          </section>
        </div>
      </div>
    </main>
  );
}
