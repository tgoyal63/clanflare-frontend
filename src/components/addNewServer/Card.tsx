import { cn } from "@/lib/utils";
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
      <Card className="p-2 hover:border-primary h-fit ">
        <Link
          href={
            hasAccess
              ? {
                  pathname: "addNewServer/form",
                  query: { serverid: "abcdef" },
                }
              : "#"
          }
          className={cn("flex gap-2", {
            "grayscale opacity-75 cursor-not-allowed ": !hasAccess,
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
        </Link>
        <div
          className={cn("border p-2 mt-2", {
            " hidden": hasAccess,
          })}
        >
          NOTE: this cant be done as you do not own the server
        </div>
      </Card>
    </>
  );
}
