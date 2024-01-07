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
          router.push(`/service-details/gangsta-philosophy?id=${props.data._id}`);
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
    },
  });
  return <>{children}</>;
}

