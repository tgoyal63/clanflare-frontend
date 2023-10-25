import { AddNewServerCard } from "@/components";
import { mockAddNewServerServers } from "@/mockdata";
export default function DashBoard() {
  return (
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
  );
}
