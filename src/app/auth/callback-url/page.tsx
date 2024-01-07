"use client";
import { useUserStore } from "@/store";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/* TODO
  can change params while saveing ,
  tried using windwo object but buged out , 
  as of know not that important as it redirects instantaniusly,
  can be solved using jotai
*/

export default function Profile() {
  const params = useSearchParams();
  const route = useRouter();

  const setlocalToken = useUserStore((state) => state.setToken);

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      route.replace(process.env.NEXT_PUBLIC_BASE_API_URL + `/login`);
      return;
    }
    setlocalToken(token);
    route.replace("/auth/phone-verification/");
  }, []);

  return (
    <>
      <div className="fixed left-[50%] top-[50%]" >
        <Loader2 className="animate-spin" />
      </div>
    </>
  );
}
