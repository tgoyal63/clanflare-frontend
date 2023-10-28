/* Authanticate with discord */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useToast } from "@/components/ui/use-toast";
import { extractIdFromSheetUrl } from "@/utils/googlesheet";
import { ArrowLeft, CopyIcon, Loader2, PlusSquare } from "lucide-react";
import NavLink from "next/link";
import { useRouter } from "next/navigation";

// import imageCopylink  from "@/assets/tutorial/copy-link.webp"
import { ExampleDialog, SheetInputForm, Steeper } from "@/components";
import { useQuery } from "@tanstack/react-query";

import imageConfirmpermmission from "@/assets/tutorial/confirm-permission.webp";
import imagePasteemail from "@/assets/tutorial/poaste-email.webp";
import imageSharebtn from "@/assets/tutorial/share-btn.webp";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

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
  const [links, setLinks] = useState<string[]>([]);
  const [addNewLink, setAddNewLink] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  // const { mutate, isPending: isLoading } = useMutation({
  //   mutationKey: ["google-sheet-setup"],
  //   mutationFn: async (data: any) => {
  //     const res = await axios("/", data);
  //     return res.data;
  //   },
  //   onSuccess: (data) => {
  //     //
  //     router.push(`/add-services/form/addSheetDetails`);
  //   },

  //   onError: (error) => {
  //     //
  //   },
  // });

  // Query 1, get all connected Sheets

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["get-connected-sheets"],
    queryFn: async () => {
      return ["link1", "link2", "link3"];
    },
  });

  useEffect(() => {
    if (isSuccess && data.length) {
      setLinks(data);
    }
  }, [isSuccess, data]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SheetFormSchema>) {
    const sheetId = extractIdFromSheetUrl(values.url);
    // mutate(sheetId);
  }
  function handleSelectChange(value: string) {
    if (value !== "add-new") {
      setSelectedValue(value);
      addNewLink ? setAddNewLink(false) : "";
      return;
    }
    setAddNewLink(true);
    setSelectedValue("Add new sheet");
    setIsOpen(false);
  }
  return (
    <>
      <main className="flex min-h-full flex-col items-center justify-between">
        <div className="z-10 flex h-full w-full max-w-5xl flex-col text-sm">
          <Steeper setpNumber={2} />
          <div className="my-auto self-center">
            <NavLink href={"/add-services/form/add-bot-to-server"}>
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
              {/* SELECTER */}

              {/* STEP -2 */}

              {addNewLink ? (
                <>
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
                          2.Open google sheet that contains user data and click
                          on share button and a popup will appear.
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
                  <SheetInputForm />
                </>
              ) : (
                <>
                  <Select
                    onValueChange={handleSelectChange}
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    value={selectedValue}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Sheet link" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Linked Sheets</SelectLabel>
                        {links?.map((item, i) => (
                          <SelectItem key={i} value={item}>
                            {item}
                          </SelectItem>
                        ))}

                        <Button
                          variant={"ghost"}
                          className="w-full gap-4"
                          onClick={() => handleSelectChange("add-new")}
                        >
                          {" "}
                          Add New Server <PlusSquare />
                        </Button>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </>
              )}
              {addNewLink ? (
                <></>
              ) : (
                <Button
                  type="submit"
                  className="mt-6 w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "connect and continue"
                  )}
                </Button>
              )}
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
