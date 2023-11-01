"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Steeper } from "@/components";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAxiosApi } from "@/hooks/useAxiosApi";
import { useNewServerStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, X } from "lucide-react";
import Link from "next/link";

type Role = {
  id: string;
  name: string;
  color: string;
  icon: string;
  isChecked: boolean;
};

export default function FormAddService() {
  const router = useRouter();
  const { toast } = useToast();
  const { api } = useAxiosApi();
  const guildId = useNewServerStore((s) => s.server.id);

  const [roles, setRoles] = useState<Role[]>([]);

  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["google-sheet-setup"],
    mutationFn: async (data: any) => {
      return [];
    },
    onSuccess: (data) => {
      router.push(`/add-services/form/addingbotRoles`);
    },

    onError: (error) => {},
  });

  const {} = useQuery({
    queryKey: ["get-roles"],
    queryFn: async () => {
      const res = await api.get("/discord-roles", {
        params: {
          guildId,
        },
      });
      const data = res.data?.data as Role[];
      setRoles(data?.map((item) => ({ ...item, isChecked: false })));
      return res.data?.data as Role;
    },
  });

  function onSubmit() {
    console.log("lol");
    toast({
      title: `Sheet linked Succefully`,
      duration: 2000,
    });
    router.push(`./phoneverification/verifyotp?roles=`);
  }

  function handleToggle(index: number, isChecked: boolean) {
    const newRole = roles.slice();
    newRole[index].isChecked = isChecked;
    setRoles(newRole);
  }

  return (
    <>
      <div className="flex h-full flex-col items-center justify-between text-sm">
        <Steeper setpNumber={4} />
        <div className="my-auto self-center">
          <Link href={"./sheet-linking/add-data-cells"}>
            <Button variant={"outline"} className="mb-4">
              <ArrowLeft className="mr-4" /> Back
            </Button>
          </Link>
          <Card className="mb-6 w-full max-w-xl p-6 shadow-md">
            <h1 className="mb-4 text-2xl">
              Select Roles, <br />
              <span className="text-lg">
                Turn on switches for which roles you want to select{" "}
              </span>
            </h1>
            <div className="flex justify-end">
              <Button disabled={roles?.length === 0 && !isLoading}>
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Continue with select roles"
                )}
              </Button>
            </div>

            <Separator className="mt-4" />
            <Card className="my-4 shadow-sm">
              <ul className="flex flex-wrap justify-between gap-2 p-4 pl-6">
                {roles?.map(
                  (role, i) =>
                    role.isChecked && (
                      <li
                        style={{ borderColor: role.color }}
                        className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl border px-4 py-2"
                        key={i}
                        onClick={() => handleToggle(i, false)}
                      >
                        {role.name}
                        <X />
                      </li>
                    ),
                )}
              </ul>
            </Card>
            <div className="grid gap-4 lg:grid-cols-2">
              {roles?.map((item, index) => {
                return (
                  <Label
                    key={item.id}
                    htmlFor={item.id}
                    className="flex items-center rounded-lg border px-2 py-1"
                  >
                    {item.icon ? (
                      <Avatar>
                        <AvatarImage
                          className="bottom-2 mr-2 "
                          height={12}
                          width={12}
                          src={item.icon}
                          style={{ borderColor: item.color }}
                        ></AvatarImage>
                      </Avatar>
                    ) : (
                      <span
                        style={{ borderColor: item.color }}
                        className="mr-2 flex h-12 w-12 items-center justify-center rounded-full border-2  bg-muted text-center  text-muted-foreground"
                      >
                        {item.name[0] + item.name[1]}
                      </span>
                    )}
                    <span className="flex-1">{item.name}</span>
                    <Switch
                      id={item.id}
                      onCheckedChange={(isChecked) =>
                        handleToggle(index, isChecked)
                      }
                      checked={item.isChecked}
                    />
                  </Label>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
