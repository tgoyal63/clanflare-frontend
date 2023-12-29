"use client";

import Navbar from "@/components/shared/NavBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  // const data = useQuery()
  return (
    <>
      <Navbar />
      <div className="flex h-full w-full justify-center">
        <div className="mx-4 w-full max-w-5xl p-2 md:px-2">
          <h1 className="mt-8 text-3xl md:text-5xl ">
            Gangsta Philosphy{" "}
            <span className="flex text-sm opacity-70 md:inline-flex">
              tagmango intigration service
            </span>
          </h1>

          <Link href={"/service-details/gangsta-philosophy/select-server"}>
            <Button>click here to tagmango</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

/* 
 - status 
 - please click here to stablish connection with tagmango
 - other detia 
*/
