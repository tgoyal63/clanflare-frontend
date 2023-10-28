import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";

export interface Props {
  id: string;
  name: string;
  isAdmin: boolean;
  icon: string;
}

export default function AddNewServerCard({ name, id, isAdmin, icon }: Props) {
  return (
    <>
      <Card
        className={cn("group relative h-full p-2 hover:border-primary", {
          "border-green-600": isAdmin,
        })}
      >
        <div
          className={cn(
            "absolute left-0 top-0 z-10 flex h-full w-full origin-left scale-x-0 items-center justify-center rounded-lg bg-secondary transition-transform duration-200",
            {
              " group-focus-within:scale-x-100 group-hover:scale-x-100":
                !isAdmin,
            },
          )}
        >
          You dont have admin role in this server
        </div>
        <Link
          href={
            isAdmin
              ? {
                  pathname: "add-services/form/add-bot-to-server",
                  query: { id: id },
                }
              : "#"
          }
          className={cn("flex gap-2", {
            "origin-right cursor-not-allowed opacity-75  transition-all duration-200 group-hover:scale-x-0":
              !isAdmin,
          })}
        >
          <div>
            <Avatar>
              <AvatarImage src={icon} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div>
            <div className="text-xl">{name}</div>
          </div>
          <div className="my-auto ml-auto mr-2 ">
            {isAdmin ? "" : <AlertCircle className="" />}
          </div>
        </Link>
      </Card>
    </>
  );
}
