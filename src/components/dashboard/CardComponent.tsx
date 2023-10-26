import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

/* TODO
  make card reusable
*/

interface DashBoardCardProps extends BadgeProps {
  serverName: string;
  serviceName: string;
}

export default function CardComponent(props: BadgeProps) {
  return (
    <>
      <DetailsPopup>
        <button className="flex-cols flex cursor-pointer items-center gap-2 rounded-lg border bg-card px-6 py-4 text-card-foreground shadow-sm transition-all hover:border-primary active:scale-[98%] ">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col gap-2 p-1 text-left">
            <span>Auth Service</span>
            <span>@gangstar Philosphy</span>
            <Badge variant="red" />
          </div>
        </button>
      </DetailsPopup>
    </>
  );
}

type BadgeProps = {
  className?: string; // Optional class name for additional styling
  variant: "default" | "red"; // The variant can be either 'default' or 'red'
};

const Badge = (props: BadgeProps) => {
  const { className, variant } = props;
  return (
    <>
      <span
        className={cn(
          "w-fit rounded-full border border-green-600 bg-success px-4 py-1 text-success-foreground",
          {
            "border-red-700 bg-destructive text-destructive-foreground":
              variant === "red",
          },
          className, // Additional class name passed in props
        )}
      >
        {variant === "red" ? "inactive" : "active"}
      </span>
    </>
  );
};

/* TODO add props from parent */
export function DetailsPopup({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-2xl">Lol</span>
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="mb-4">
            Service Name: <span>Simple Authentication with sheet</span>
          </div>
          {/* dates */}
          <div className="text-md text-">created at: 23/4/22</div>
          <div className="text-md text-">expires on: 23/4/22</div>

          <div className="mt-4">
            <span>Plan Type: </span>
            <span> Free</span>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
