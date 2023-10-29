"use client";
import { useUserStore } from "@/store";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      redirect(process.env.NEXT_PUBLIC_BASE_API_URL + "/login");
    } else {
      redirect("/dashboard");
    }
  }, [token]);
}
