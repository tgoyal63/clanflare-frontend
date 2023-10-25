/* Authanticate with discord */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { ArrowLeft, CopyIcon, Link } from "lucide-react";
import Image from "next/image";
import NavLink from "next/link";
import { useRouter } from "next/navigation";

import imageSharebtn from "@/assits/tutorial/share-btn.webp";
// import imageCopylink  from "@/assits/tutorial/copy-link.webp"
import imageConfirmpermmission from "@/assits/tutorial/confirm-permission.webp";
import imagePasteemail from "@/assits/tutorial/poaste-email.webp";

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
        <div className="z-10 flex h-screen w-full max-w-5xl flex-col text-sm">
          <Stepper />
          <div className="my-auto self-center">
            <NavLink href={"/addNewServer/form"}>
              <Button variant={"outline"} className="mb-4">
                {" "}
                <ArrowLeft className="mr-4" /> Back
              </Button>
            </NavLink>
            <Card className="w-full max-w-lg p-6 shadow-md">
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
              <Accordion type="single" collapsible className="w-full ">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="my-0 py-2 text-left">
                    Give access to the given link . Click here to learn how ?
                  </AccordionTrigger>
                  <AccordionContent>
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
                          2.Open google sheet that contains user data and click
                          on share button and a popup will appear.
                          <Image src={imageSharebtn} alt="share button image" />
                        </li>

                        <li>
                          3.Paste the email you copied in {"step 1"} to click on
                          done.
                          <Image
                            src={imagePasteemail}
                            alt="share button image"
                          />
                        </li>
                        <li>
                          4.At last make sure that editor is selected in the
                          button showed in image below. after that click on
                          send.
                          <Image
                            src={imageConfirmpermmission}
                            alt="share button image"
                          />
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
      <div className="my-4 flex w-full items-center ">
        <div className="relative flex items-center text-primary">
          <div className="h-12 w-12 rounded-full border-2 bg-primary py-3 text-center text-primary-foreground transition duration-500 ease-in-out  ">
            1
          </div>
        </div>
        <div className="flex-auto border-t-2 border-primary transition duration-500 ease-in-out "></div>
        <div className="relative flex items-center text-primary">
          <div className="h-12 w-12 rounded-full border-2 bg-primary py-3 text-center text-primary-foreground transition duration-500 ease-in-out  ">
            2
          </div>
        </div>
        <div className="flex-auto border-t-2 transition duration-500 ease-in-out "></div>
        <div className="relative flex items-center text-primary">
          <div className="h-12 w-12 rounded-full border-2 py-3 text-center transition duration-500 ease-in-out ">
            3
          </div>
        </div>
      </div>
    </>
  );
};
