"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNewServerStore } from "@/store";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// import imageCopylink  from "@/assets/tutorial/copy-link.webp"

export default function Page() {
  const sheetData = useNewServerStore((state) => state.googleSheet.allSheets);
  const updateSelectedSheet = useNewServerStore(
    (state) => state.updateSelectedSheet,
  );
  const [addNewLink, setAddNewLink] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sheetId, setSheetId] = useState("");
  const router = useRouter();

  function handleSelectChange(id: string) {
    setSheetId(id);
  }

  function handleSubmit(index: string) {
    const temp = sheetData[Number(index)];

    updateSelectedSheet(temp);
    router.push("./add-data-cells");
  }

  return (
    <>
      <>
        <div className="flex h-full flex-col items-center justify-between text-sm">
          <div className="my-auto self-center">
            <Link href={"/add-services/form/add-bot-to-server"}>
              <Button variant={"outline"} className="mb-4">
                {" "}
                <ArrowLeft className="mr-4" /> Back
              </Button>
            </Link>
            <Card className="my-auto w-full max-w-lg p-6 shadow-md ">
              <h1 className="mb-4 text-2xl">
                Select the sheet which contains user data <br />
                <span className="text-lg text-muted-foreground">
                  your GoogleSheet has multiple sub sheets please select one
                </span>
                {addNewLink && (
                  <Button
                    variant={"ghost"}
                    className="pl-1"
                    onClick={() => setAddNewLink(false)}
                  >
                    Click here to selet
                  </Button>
                )}
              </h1>
              {/* SELECTER */}

              {/* STEP -2 */}

              <Select
                onValueChange={handleSelectChange}
                open={isOpen}
                onOpenChange={setIsOpen}
                // value={selectedValue}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Sheet link" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Linked Sheets</SelectLabel>

                    {!sheetData ? (
                      <Loader2 className="animate-spin " />
                    ) : (
                      sheetData?.map((sheet, i) => (
                        <SelectItem key={sheet.sheetId} value={`${i}`}>
                          {sheet.title}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                type="submit"
                onClick={() => handleSubmit(sheetId)}
                className="mt-6 w-full"
                disabled={!sheetId}
              >
                Select and continue
              </Button>
            </Card>
          </div>
        </div>
      </>
    </>
  );
}
