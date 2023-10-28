/* Authanticate with discord */
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
// import { axios } from "@/utils/";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

// const BotsFormSchema = z.object({
//   roles: z.string().min(10, {
//     message: "Phone Number Must be atlaeast 10 numbers long",
//   }),
// });

const demodData = [
  "Surveyor",
  "Construction Manager",
  "Electrician",
  "Subcontractor",
  "Engineer",
  "Estimator",
  "Construction Manager",
  "Construction Foreman",
  "Supervisor",
  "Construction Foreman",
  "Construction Manager",
  "Project Manager",
  "Supervisor",
  "Supervisor",
  "Architect",
  "Estimator",
  "Project Manager",
  "Estimator",
  "Construction Worker",
  "Architect",
];

export default function FormAddService() {
  const router = useRouter();
  const { toast } = useToast();
  const [roles, setRoles] = useState<string[]>([]);

  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["google-sheet-setup"],
    mutationFn: async (data: any) => {
      // const res = await axios("/", data);
      // return res.data;
      return [];
    },
    onSuccess: (data) => {
      //
      router.push(`/add-services/form/addingbotRoles`);
    },

    onError: (error) => {
      //
    },
  });

  // 2. Define a submit handler.
  function onSubmit() {
    console.log("lol");
    toast({
      title: `Sheet linked Succefully`,
      duration: 2000,
    });
    router.push(`./phoneverification/verifyotp?roles=`);
  }

  function handleToggle(id: string, isChecked: boolean) {
    if (isChecked) {
      setRoles([...roles, id]);
      return;
    }

    const newRoles = roles.filter((roleId) => {
      if (roleId !== id) return roleId;
    });
    setRoles(newRoles);
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-4">
        <div className="z-10 flex h-screen w-full max-w-5xl flex-col text-sm">
          <Steeper setpNumber={4} />
          <div className="my-auto self-center">
            <Link href={"/add-services/form/googleSheetLinking"}>
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
                <ul className="grid list-disc grid-cols-2 p-4 pl-6">
                  {roles?.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </Card>
              <div className="grid gap-4 lg:grid-cols-2">
                {demodData.map((item) => {
                  return (
                    <Label
                      key={item}
                      htmlFor={item}
                      className="flex items-center rounded-lg border p-4"
                    >
                      <span className="flex-1">{item}</span>
                      <Switch
                        id={item}
                        onCheckedChange={(isChecked) =>
                          handleToggle(item, isChecked)
                        }
                      />
                    </Label>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
