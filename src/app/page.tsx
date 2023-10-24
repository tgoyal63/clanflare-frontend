import { Button } from "@/components/ui/button";
import { baseURl } from "@/server";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full max-w-5xlfont-mono text-sm">
        HELLOW WORLD
        <a href={`${baseURl}/login`}>
          <Button>Login</Button>
        </a>
      </div>
    </main>
  );
}
