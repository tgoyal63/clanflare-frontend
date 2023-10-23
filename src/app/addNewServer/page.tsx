import { AddNewServerCard, NavbarAvatar } from "@/components";
import { mockAddNewServerServers } from "@/mockdata";
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
          <section className="mt-5">
            <h1 className="text-2xl ">All servers</h1>
          </section>
          <section className="grid mt-4 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
            {mockAddNewServerServers.map((item, index) => {
              return (
                <AddNewServerCard
                  key={index}
                  hasAccess={item.hasAccess}
                  roles={item.roles}
                  serverName={item.serverName}
                  totalMembers={item.totalMembers}
                />
              );
            })}
          </section>
        </div>
      </div>
    </main>
  );
}
