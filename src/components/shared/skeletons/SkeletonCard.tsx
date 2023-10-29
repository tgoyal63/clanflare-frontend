import { Card } from "@/components/ui/card";
import { Skeleton } from "./BaseSkeleton";

export default function CardSkeleton() {
  return (
    <>
      <Card className="flex items-center gap-4 p-2 ">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-6 flex-1" />
      </Card>
    </>
  );
}
