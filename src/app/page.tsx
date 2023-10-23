import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full max-w-5xlfont-mono text-sm">
        HELLOW WORLD
        <Link href={"/auth/phoneverification"}>
          <Button>Login</Button>
        </Link>
      </div>
    </main>
  );
}
