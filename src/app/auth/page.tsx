"use client";
import { useAuthenticator } from "@/hooks/useAuthenticator";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { token } = useAuthenticator();

  useEffect(() => {
    if (!token) {
      redirect(process.env.NEXT_PUBLIC_BASE_API_URL + "/login");
    } else {
      redirect("/dashboard");
    }
  }, [token]);
  // console.log(process.env.BASE_AUTH_URL);
}
