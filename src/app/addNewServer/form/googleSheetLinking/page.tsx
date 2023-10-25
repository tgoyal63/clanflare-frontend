/* Authanticate with discord */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";
import { extractIdFromSheetUrl } from "@/utils/googlesheet";
import { ArrowLeft, Link } from "lucide-react";
import NavLink from "next/link";
import { useRouter } from "next/navigation";

const SheetFormSchema = z.object({
  url: z
    .string()
    .url("Invalid url")
    .refine(
      (url) => {
        return url.startsWith("https://docs.google.com/spreadsheets");
      },
      {
        message: "Not a valid google sheet url",
      }
    ),
});

export default function FormAddService() {
  const form = useForm<z.infer<typeof SheetFormSchema>>({
    resolver: zodResolver(SheetFormSchema),
    reValidateMode: "onChange",
  });
  const router = useRouter();
  const { toast } = useToast();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SheetFormSchema>) {
    const seetId = extractIdFromSheetUrl(values.url);

    toast({
      title: `Sheet id ${seetId}`,
      duration: 2000,
    });
    // router.push(`/addNewServer/form/addingbotRoles`);
  }
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-4">
        <div className="z-10 w-full h-screen max-w-5xl font-mono text-sm flex flex-col">
          <Stepper />
          <div className="self-center my-auto">
            <NavLink href={"/addNewServer/form"}>
              <Button variant={"outline"} className="mb-4">
                {" "}
                <ArrowLeft className="mr-4" /> Back
              </Button>
            </NavLink>
            <Card className="p-6 max-w-md w-full shadow-md">
              <h1 className="text-2xl mb-4">
                Connect to Google Sheet <br />
                <span className="text-lg text-muted-foreground">
                  This Sheet will be used to manage users
                </span>
              </h1>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="items-center">
                          URL <Link className="inline-block h-4 w-4" />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="http://sheet.google/com"
                            // type="url"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Paste the link of google sheet here
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    connect
                  </Button>
                </form>
              </Form>
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
      <div className="flex items-center w-full my-4 ">
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
        <div className="flex-auto border-t-2 transition duration-500 ease-in-out "></div>
        <div className="flex items-center text-primary relative">
          <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 text-center ">
            3
          </div>
        </div>
      </div>
    </>
  );
};
