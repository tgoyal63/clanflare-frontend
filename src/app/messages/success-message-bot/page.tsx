import { Card } from "@/components/ui/card";

export default function Callback() {
  return (
    <div className="h-screen w-screen">
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Card className="max-w-md p-8">
          Bot Added Succfully pleae close this window and continue the process
        </Card>
      </div>
    </div>
  );
}
