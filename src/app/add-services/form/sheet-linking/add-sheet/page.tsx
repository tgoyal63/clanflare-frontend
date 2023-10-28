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
import { ArrowLeft, CopyIcon, Link, Loader2 } from "lucide-react";
import NavLink from "next/link";
import { useRouter } from "next/navigation";

// import imageCopylink  from "@/assets/tutorial/copy-link.webp"
import { ExampleDialog, Steeper } from "@/components";
import { axios } from "@/utils/server";
import { useMutation } from "@tanstack/react-query";

import imageConfirmpermmission from "@/assets/tutorial/confirm-permission.webp";
import imagePasteemail from "@/assets/tutorial/poaste-email.webp";
import imageSharebtn from "@/assets/tutorial/share-btn.webp";
import Image from "next/image";

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
      },
    ),
});

export default function FormAddService() {
  const form = useForm<z.infer<typeof SheetFormSchema>>({
    resolver: zodResolver(SheetFormSchema),
    reValidateMode: "onChange",
  });
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["google-sheet-setup"],
    mutationFn: async (data: any) => {
      const res = await axios("/", data);
      return res.data;
    },
    onSuccess: (data) => {
      //
      router.push(`/add-services/form/addSheetDetails`);
    },

    onError: (error) => {
      //
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SheetFormSchema>) {
    const sheetId = extractIdFromSheetUrl(values.url);
    mutate(sheetId);
  }
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="z-10 flex h-full w-full max-w-5xl flex-col text-sm">
          <Steeper setpNumber={2} />
          <div className="my-auto self-center">
            <NavLink href={"/add-services/form"}>
              <Button variant={"outline"} className="mb-4">
                {" "}
                <ArrowLeft className="mr-4" /> Back
              </Button>
            </NavLink>
            <Card className="my-auto w-full max-w-lg p-6 shadow-md ">
              <h1 className="mb-4 text-2xl">
                Connect to Google Sheet <br />
                <span className="text-lg text-muted-foreground">
                  This Sheet will be used to manage users
                </span>
              </h1>
              {/* STEP - 1 */}
              <h2 className="text-xl underline decoration-primary underline-offset-2">
                Step 1
              </h2>
              {/* <h3 className="text-lg">Give access to the given link how ?</h3> */}
              <ExampleDialog title="Give your google sheet access to this email, Click here to learn how ?">
                <div>
                  <ul className="space-y-8">
                    <li>
                      <span>1.Copy this email</span>
                      <div className="mt-2 flex items-center rounded-lg border bg-card font-light text-card-foreground shadow-sm">
                        <span className="flex-1 pl-2">saket@gmail.com</span>
                        <Button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              "saketverma@gmail.com",
                            );
                            toast({
                              title: "copied to clipboard",
                              duration: 1000,
                            });
                          }}
                          variant={"ghost"}
                          className="border-l"
                        >
                          <CopyIcon />
                        </Button>
                      </div>
                    </li>
                    <li>
                      2.Open google sheet that contains user data and click on
                      share button and a popup will appear.
                      <Image src={imageSharebtn} alt="share button image" />
                    </li>

                    <li>
                      3.Paste the email which you copied in {"step 1"} to{" "}
                      <span className="rounded-md bg-muted-foreground bg-opacity-60 p-1 px-2 text-background">
                        {"Add people input"}
                      </span>{" "}
                      as shown in image below.
                      <br /> After that click on done and move to next step
                      done.
                      <Image src={imagePasteemail} alt="share button image" />
                    </li>
                    <li>
                      4.At last make sure that editor is selected in the button
                      showed in image below. after that click on send.
                      <Image
                        src={imageConfirmpermmission}
                        alt="share button image"
                      />
                    </li>
                  </ul>
                </div>
              </ExampleDialog>

              <div className="mb-8 flex items-center rounded-lg border bg-card text-card-foreground shadow-sm">
                <span className="flex-1 pl-2">saket@gmail.com</span>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText("saketverma@gmail.com");
                    toast({
                      title: "copied to clipboard",
                      duration: 1000,
                    });
                  }}
                  variant={"ghost"}
                  className="border-l"
                >
                  <CopyIcon />
                </Button>
              </div>
              {/* STEP -2 */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2"
                >
                  <h2 className="text-xl underline decoration-primary underline-offset-2">
                    Step 2
                  </h2>{" "}
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
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "connect and continue"
                    )}
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
