"use client";

import Navbar from "@/components/shared/NavBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams()
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

          <div className="grid grid-rows-2 gap-4 mt-4">
            <Link
              href={{
                pathname: '/add-services/tag-mango',
                query: { id: params.get('id') },
              }} >
              <Button>Phone Authentication</Button>
            </Link>
            <Link
              href={{
                pathname: '/add-services/tag-mango/select-manog',
                query: { id: params.get('id') },
              }} >
              <Button>Select Your Cource</Button>
            </Link>
          </div>
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
