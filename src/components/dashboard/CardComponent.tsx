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
import { ExternalLink, Link2 } from "lucide-react";

/* TODO
  make card reusable
*/

interface DashBoardCardProps extends BadgeProps {
  serverName: string;
  serviceName: string;
  data: data;
}

type data = {
  guild: {
    name: string;
    icon: string;
  };
  createdAt: string;
  spreadsheet: {
    spreadsheetUrl: string;
  };
  creator: {
    username: string;
    email: string;
  };
};

export default function CardComponent(props: { data: data }) {
  const { createdAt, guild, spreadsheet } = props.data;
  return (
    <>
      <DetailsPopup data={props.data}>
        <button className="flex-cols flex cursor-pointer items-center gap-2 rounded-lg border bg-card px-6 py-4 text-card-foreground shadow-sm transition-all hover:border-primary active:scale-[98%] ">
          <Avatar>
            <AvatarImage src={guild.icon} alt="@shadcn" />
            <AvatarFallback>{guild.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col gap-2 p-1 text-left">
            <span>Auth Service</span>
            <span>{guild.name}</span>
            <Badge variant="default" />
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
          "w-fit rounded-full border  bg-success px-4 py-1 text-success-foreground",
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

type DialogProps = {
  children: ReactNode;
  data: data;
};

/* TODO add props from parent */
export function DetailsPopup({ children, data }: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={data.guild.icon} />
              <AvatarFallback>{data.guild.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-2xl">{data.guild.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="mb-4">
            Service Name: <span>{"Auth Service"}</span>
            <br />
            <a
              className=" flex gap-2 text-primary underline decoration-primary"
              href={data.spreadsheet.spreadsheetUrl}
              target="_blank"
            >
              Sheet link <ExternalLink />
            </a>
          </div>
          {/* dates */}
          <div className="text-md text-">
            created on: {data.createdAt.slice(0, 10)}
            <br />
            created by: {data.creator.username}
            <br />
            status: <span className="text-success-foreground"> Active </span>
          </div>

          {/*          <div className="mt-4">
            <span>Plan Type: </span>
            <span> Free</span>
          </div>*/}
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
