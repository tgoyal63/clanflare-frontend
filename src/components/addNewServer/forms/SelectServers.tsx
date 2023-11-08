"use client";
import { AddNewServerCard } from "@/components";
import CardSkeleton from "@/components/shared/skeletons/SkeletonCard";
import { useAxiosApi } from "@/hooks/useAxiosApi";
import { useNewServerStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function SelectServer() {
    const { api } = useAxiosApi();
    const clean = useNewServerStore((state) => state.clean);
    const { data: servers, isLoading } = useQuery({
        queryKey: ["all-servers-"],
        queryFn: async () => {
            const res = await api.get("/guilds");
            return res.data.data;
        },
    });

    useEffect(() => {
        // cleans all the data from addNewServerStore
        clean();
    }, []);

    return (
        <div>
            <section className="mt-5">
                <h1 className="text-2xl ">All servers</h1>
            </section>
            <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
                {isLoading ? (
                    <CardSkeleton />
                ) : (
                    <>
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
                    </>
                )}
            </section>
        </div>
    );
}
