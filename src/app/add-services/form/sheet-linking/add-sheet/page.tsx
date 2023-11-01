"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { ArrowLeft, CopyIcon } from "lucide-react";
import NavLink from "next/link";

// import imageCopylink  from "@/assets/tutorial/copy-link.webp"
import { ExampleDialog, SheetInputForm, Steeper } from "@/components";

import imageConfirmpermmission from "@/assets/tutorial/confirm-permission.webp";
import imagePasteemail from "@/assets/tutorial/poaste-email.webp";
import imageSharebtn from "@/assets/tutorial/share-btn.webp";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

export default function FormAddService() {
  const { toast } = useToast();
  return (
    <>
      <div className="flex h-full flex-col items-center justify-between text-sm">
        <Steeper stepNum={2} />
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
                        <span className="flex-1 pl-2">
                          authify@eastern-braid-380722.iam.gserviceaccount.com
                        </span>
                        <Button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              "authify@eastern-braid-380722.iam.gserviceaccount.com",
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
                <span className="flex-1 pl-2">
                  authify@eastern-braid-380722.iam.gserviceaccount.com
                </span>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "authify@eastern-braid-380722.iam.gserviceaccount.com",
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
              <SheetInputForm />
            </>
          </Card>
        </div>
      </div>
    </>
  );
}
