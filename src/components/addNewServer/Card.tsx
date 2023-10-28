import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";

export interface Props {
  serverName: string;
  roles: string[];
  totalMembers: string;
  hasAccess: boolean;
}

export default function AddNewServerCard({
  serverName,
  roles,
  totalMembers,
  hasAccess,
}: Props) {
  return (
    <>
      <Card className="group relative h-fit p-2 hover:border-primary ">
        <div
          className={cn(
            "absolute left-0 top-0 z-10 flex h-full w-full origin-left scale-x-0 items-center justify-center rounded-lg bg-secondary transition-transform duration-200",
            {
              " group-focus-within:scale-x-100 group-hover:scale-x-100":
                !hasAccess,
            },
          )}
        >
          You dont have admin role in this server
        </div>
        <Link
          href={
            hasAccess
              ? {
                  pathname: "add-services/form",
                  query: { serverid: "abcdef" },
                }
              : "#"
          }
          className={cn("flex gap-2", {
            "origin-right cursor-not-allowed opacity-75 grayscale transition-all duration-200 group-hover:scale-x-0":
              !hasAccess,
          })}
        >
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div>
            <div className="text-xl">{serverName}</div>
            <div className="text-md">
              your roles:{" "}
              {roles.map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </div>
            <div className="text-md text-muted-foreground">
              Total members: {totalMembers}
            </div>
          </div>
          <div className="my-auto ml-auto mr-2">
            {hasAccess ? "" : <AlertCircle />}
          </div>
        </Link>
      </Card>
    </>
  );
}
