"use client";
import { useAddNewServerStore } from "@/store";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const setServer = useAddNewServerStore((state) => state.updateServer);
  const params = useSearchParams();
  const route = useRouter();
  const id = params.get("id");

  useEffect(() => {
    if (!id) return route.push("./");
    setServer(id, false);
    redirect("./form/add-bot-to-server");
  }, [id]);
}
