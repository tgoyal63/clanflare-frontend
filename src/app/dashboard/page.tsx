import { CardDashboard, NavbarAvatar } from "@/components";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashBoard() {
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
      {/* Body */}
      <div className="w-full max-w-[90rem] font-mono text-sm p-4">
        <div>
          <section className="sm:flex  mt-5">
            <h1 className="text-2xl mr-auto mb-2 sm:mb-0">All servers</h1>
            <Link href={"#"}>
              <Button>
                <Plus className="mr-2" />
                Add new Server
              </Button>
            </Link>
          </section>
          <section className="grid mt-4 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(
              (item: any, index) => {
                return <CardDashboard key={index} variant="default" />;
              }
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
