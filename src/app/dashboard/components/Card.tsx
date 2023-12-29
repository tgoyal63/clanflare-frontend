"use client";
import { cn } from "@/utils/cn";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAxiosApi } from "@/hooks/useAxiosApi";
import { IGetService_Data } from "@/utils/backend/user/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

/* TODO
  make card reusable
*/

type CardProps = {
  data: IGetService_Data;
  varient: "default" | "custom";
};

export function Card(props: CardProps) {
  const { createdAt, guild } = props.data;
  const router = useRouter();
  function handleDetailsPageRouting() {
    if (props.data.isCustom) {
      switch (props.data.customIntegrationId) {
        case "gangstaPhilosophy":
          router.push("/service-details/gangsta-philosophy");
          break;

        default:
          break;
      }
    } else {
      if (props.data.integrationType === "sheets") {
        router.push(`/service-details/sheets/${props.data._id}`);
      }
    }
  }
  return (
    <>
      <button
        onClick={() => handleDetailsPageRouting()}
        className=" relative cursor-pointer gap-2 rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition-all hover:border-primary active:scale-[98%] "
      >
        <div className="text-left">
          <h2 className="text-sm opacity-80">{createdAt.slice(0, 10)}</h2>
          <h1
            className={cn("font-mono text-lg font-bold ", {
              "text-amber-500": props.varient === "custom",
            })}
          >
            {props.data?.name}
          </h1>
        </div>
        <div className="flex-cols my-4 flex items-center gap-6">
          <Avatar className="border">
            <AvatarImage src={guild.icon || ""} alt="@shadcn" />
            <AvatarFallback className="grid place-items-center">
              {guild.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="block text-left text-sm opacity-80">
              Discord Server
            </span>
            <span className="block text-left ">{guild.name}</span>
          </div>
        </div>

        <div className="my-2 flex">
          <Badge variant={props.data.status} />
        </div>

        <div
          className={cn(
            "absolute bottom-0 right-0 z-10 h-20 w-20 rounded-l-full  blur-3xl",
            {
              "bg-amber-400": props.varient === "custom",
              "bg-green-600": props.varient === "default",
              "bg-red-600": props.data.status === "inactive",
            },
          )}
        ></div>
      </button>
    </>
  );
}

type BadgeProps = {
  className?: string; // Optional class name for additional styling
  // variant: "active" | "inactive" | "pending"; // The variant can be either 'default' or 'red'
  variant: any; // The variant can be either 'default' or 'red'
};

const Badge = (props: BadgeProps) => {
  const { className, variant } = props;
  return (
    <>
      <span
        className={cn(
          "w-fit rounded-full border border-dashed   px-4 py-1 text-success-foreground",
          {
            "border-red-700  text-red-600": variant == "inactive",
            "border-success text-success-foreground": variant == "active",
            "border-yellow-600  text-yellow-500": variant == "pending",
          },
          className, // Additional class name passed in props
        )}
      >
        {variant}
      </span>
    </>
  );
};

type DialogProps = {
  children: ReactNode;
  sheetId: string;
};

/* TODO add props from parent */
export function DetailsPopup({ children, sheetId }: DialogProps) {
  const { api } = useAxiosApi();

  const { data } = useQuery({
    queryKey: ["service-data"],
    queryFn: async () => {
      const res = await api.get(`/service/${sheetId}`);
      console.log(res?.data);
    },
  });
  return <>{children}</>;
}

/* 
  <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-6">
            <Avatar>
              <AvatarImage src={data.guild.icon || ""} />
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
*/
