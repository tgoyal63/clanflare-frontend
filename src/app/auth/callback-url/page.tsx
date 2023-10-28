"use client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

/* TODO
  can change params while saveing ,
  tried using windwo object but buged out , 
  as of know not that important as it redirects instantaniusly,
  can be solved using jotai
*/

export default function Profile() {
  const params = useSearchParams();
  const [, setAuth] = useLocalStorage("auth", "");
  const route = useRouter();

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      route.replace(process.env.NEXT_PUBLIC_BASE_API_URL + `/login`);
      return;
    }
    setAuth(token);
    route.replace("/auth/phoneverification/");
  }, []);

  return (
    <>
      <Loader2 className="fixed left-[50%] top-[50%] animate-spin" />
    </>
  );
}
