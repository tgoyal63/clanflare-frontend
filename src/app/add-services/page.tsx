"use client";
import { AddNewServerCard } from "@/components";
import { useAxiosApi } from "@/hooks/useAxiosApi";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export default function DashBoard() {
  const { api, isLoading } = useAxiosApi();

  const { data: servers, mutate } = useMutation({
    mutationKey: ["123"],
    mutationFn: async () => {
      const res = await api.get("/guilds");
      return res.data.data;
    },
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }
    mutate();
  }, [isLoading]);

  return (
    <div>
      <section className="mt-5">
        <h1 className="text-2xl ">All servers</h1>
        <button onClick={() => mutate()}>click me</button>
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
