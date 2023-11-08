"use client";
import { useUserStore } from "@/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const token = useUserStore((state) => state.token);
  const router = useRouter()

  const getUrl = async () => {
    try {


      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/oauth-link`,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        },
      );
      const newURL = res.data?.data.oauthLink as string;
      router.push(newURL);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (!token) {
      if (process.env.NEXT_PUBLIC_AUTH_URL) {
        router.push(process.env.NEXT_PUBLIC_AUTH_URL);
      } else {
        getUrl();
      }
    } else {
      router.push("/dashboard");
    }
  }, [token]);
  return <>redirecting</>;
}
