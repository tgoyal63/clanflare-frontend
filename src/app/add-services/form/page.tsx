"use client";
import { addNewServerAtom } from "@/store/addNewServer";
import { useAtom } from "jotai";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const [, setServiceData] = useAtom(addNewServerAtom);
  const params = useSearchParams();
  const route = useRouter();
  const id = params.get("id");

  useEffect(() => {
    if (!id) return route.push("./");
    setServiceData((state) => {
      state.server.id = id;

      return state;
    });
    redirect("./form/add-bot-to-server");
  }, [id]);
}
