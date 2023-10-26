"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/useLogout";
import { LogOutIcon, Settings } from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function AvatarNavBar() {
  return (
    <>
      <DropdownMenuCheckboxes>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuCheckboxes>
    </>
  );
}

export function DropdownMenuCheckboxes({
  children,
}: {
  children: React.ReactNode;
}) {
  const logout = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile Setting <Settings className="ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem className="mt-1 bg-none p-0">
          <Button
            variant={"destructive"}
            className="w-full px-2"
            onClick={() => logout()}
          >
            logout <LogOutIcon className="ml-auto" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
