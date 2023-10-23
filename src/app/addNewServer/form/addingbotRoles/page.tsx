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

import { ArrowLeft } from "lucide-react";
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
        <div className="z-10 w-full h-screen max-w-5xl font-mono text-sm flex flex-col">
          <Stepper />
          <div className="self-center my-auto">
            <Link href={"/addNewServer/form/googleSheetLinking"}>
              <Button variant={"outline"} className="mb-4">
                <ArrowLeft className="mr-4" /> Back
              </Button>
            </Link>
            <Card className="p-6 max-w-xl w-full mb-6 shadow-md">
              <h1 className="text-2xl mb-4">
                Select Roles, <br />
                <span className="text-lg">
                  Turn on switches for which roles you want to select{" "}
                </span>
              </h1>
              <div className="flex justify-end">
                <Button disabled={roles?.length === 0}>
                  Continue with select roles
                </Button>
              </div>

              <Separator className="mt-4" />
              <Card className="my-4 shadow-sm">
                <ul className="grid list-disc p-4 pl-6 grid-cols-2">
                  {roles?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Card>
              <div className="grid gap-4 lg:grid-cols-2">
                {demodData.map((item) => {
                  return (
                    <Label
                      key={item}
                      htmlFor={item}
                      className="flex border rounded-lg items-center p-4"
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

const Stepper = () => {
  return (
    <>
      <div className="flex my-6 items-center w-full ">
        <div className="flex items-center text-primary relative">
          <div className="rounded-full text-primary-foreground transition duration-500 ease-in-out h-12 w-12 py-3 border-2 text-center bg-primary  ">
            1
          </div>
        </div>
        <div className="flex-auto border-primary border-t-2 transition duration-500 ease-in-out "></div>
        <div className="flex items-center text-primary relative">
          <div className="rounded-full text-primary-foreground transition duration-500 ease-in-out h-12 w-12 py-3 border-2 text-center bg-primary  ">
            2
          </div>
        </div>
        <div className="flex-auto border-primary border-t-2 transition duration-500 ease-in-out "></div>
        <div className="flex items-center text-primary relative">
          <div className="rounded-full text-primary-foreground transition duration-500 ease-in-out h-12 w-12 py-3 border-2 text-center bg-primary  ">
            3
          </div>
        </div>
      </div>
    </>
  );
};
