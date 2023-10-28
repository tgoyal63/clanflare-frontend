"use client";
import { AddNewServerCard } from "@/components";
import { useAxiosApi } from "@/hooks/useAxiosApi";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { api } = useAxiosApi();

  const { data: servers } = useQuery({
    queryKey: ["all-servers-"],
    queryFn: async () => {
      const res = await api.get("/guilds");
      return res.data.data;
    },
  });

  return (
    <div>
      <section className="mt-5">
        <h1 className="text-2xl ">All servers</h1>
      </section>
      <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        {servers?.map((item: any, i: number) => {
          return (
            item.isAdmin && (
              <AddNewServerCard
                key={i}
                name={item.name}
                icon={item.icon}
                isAdmin={item.isAdmin}
                id={item.id}
              />
            )
          );
        })}
        {servers?.map((item: any, i: number) => {
          return (
            !item.isAdmin && (
              <AddNewServerCard
                key={i}
                name={item.name}
                icon={item.icon}
                isAdmin={item.isAdmin}
                id={item.id}
              />
            )
          );
        })}
      </section>
    </div>
  );
}
