import { cn } from "@/utils/cn";
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
import {
  CalendarDaysIcon,
  CheckCircle,
  ExternalLink,
  Table,
  User
} from "lucide-react";
import { ReactNode } from "react";

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
    phoneNumberColumn: string;
    emailColumn: string;
    discordIdColumn: string;
    headerRow: string;
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
        <button className=" cursor-pointer gap-2 rounded-xl border bg-card p-4 text-card-foreground shadow-sm relative transition-all hover:border-primary active:scale-[98%] ">
          <div className="text-left">
            <h2 className="opacity-80 text-sm">
              {props.data.createdAt.slice(0, 10)}
            </h2>
            <h1 className="text-lg font-mono font-bold ">Auth Service
            </h1>
          </div>
          <div className="flex flex-cols gap-6 my-4 items-center">
            <Avatar className="border">
              <AvatarImage src={guild.icon} alt="@shadcn" />
              <AvatarFallback className="grid place-items-center">
                {guild.name[0].toUpperCase()}
              </AvatarFallback>

            </Avatar>
            <div className="flex flex-col" >
              <span className="block text-left text-sm opacity-80">Discord Server</span>
              <span className="block text-left " >{guild.name}</span>
            </div>

          </div>

          <div className="flex my-2" >
            <Badge variant="default" />
          </div>

          <div className="absolute rounded-l-full bg-emerald-600 bottom-0 right-0 blur-3xl w-20 h-20 z-10" ></div>
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
          "w-fit rounded-full border border-success border-dashed  px-4 py-1 text-success-foreground",
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
          <DialogTitle className="flex items-center gap-6">
            <Avatar>
              <AvatarImage src={data.guild.icon} />
              <AvatarFallback>{data.guild.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-2xl">{data.guild.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div>
          <div>
            Service Name : <span>{"Auth Service"}</span>
            <br />
            <a
              className=" flex w-fit gap-1 text-primary decoration-primary  underline-offset-2 hover:underline"
              href={data.spreadsheet.spreadsheetUrl}
              target="_blank"
            >
              Sheet link <ExternalLink className="h-5 w-5" />
            </a>
          </div>
          <div>
            <ul className="my-4 grid grid-cols-3 grid-rows-2">
              <li className="col-span-3 mb-1 flex items-center">
                <Table className="mr-2 h-5 w-5" /> Spread Sheet Cells
              </li>
              <li className="col-span-1 border text-center ">Phone</li>
              <li className="col-span-1 border text-center ">Email</li>
              <li className="col-span-1 border text-center ">Discord ID</li>
              <li className="col-span-1 border text-center">
                {data.spreadsheet.phoneNumberColumn +
                  data.spreadsheet.headerRow}
              </li>
              <li className="col-span-1 border text-center">
                {data.spreadsheet.emailColumn + data.spreadsheet.headerRow}
              </li>
              <li className="col-span-1 border text-center">
                {data.spreadsheet.discordIdColumn + data.spreadsheet.headerRow}
              </li>
            </ul>
          </div>
          {/* dates */}
          <div className="text-md ">
            <span className="text-md flex items-center text-muted-foreground ">
              <CalendarDaysIcon className="mr-2 h-5 w-5" /> created on{" "}
              {data.createdAt.slice(0, 10)}
            </span>
            <span className="text-md flex items-center text-muted-foreground ">
              <User className="mr-2 h-5 w-5" /> by
              {" " + data.creator.username}
            </span>
            <span className="text-md flex items-center text-muted-foreground ">
              <span className="mx-1 flex items-center gap-2 text-success-foreground">
                Active
                <CheckCircle className="h-5 w-5" />
              </span>
            </span>
          </div>

          {/*          <div className="mt-4">
            <span>Plan Type: </span>
            <span> Free</span>
          </div>*/}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" className="w-full" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
