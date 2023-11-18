"use client";

import { ExampleDialog } from "@/components";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

// images
import explaneLayout from "@/assets/ss/cell-name.webp";
import { useToast } from "@/components/ui/use-toast";
import { useAxiosApi } from "@/hooks/useAxiosApi";
import { useNewServerStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";




/**Todo
 * form validation me check if row's are same
 */

const formSchema = z.object({
  heagersRow: z.string().regex(/^\d+$/, { message: "must be a valid number" })
});

// TODO: improve this zod obj
const HeadersformSchema = z.object({
  phoneHeader: z.string(),
  nameHeader: z.string(),
  discordId: z.string(),

}).refine((values) => {
  const condition = values.phoneHeader !== values.discordId && values.phoneHeader !== values.nameHeader && values.nameHeader !== values.discordId
  return condition
}, {
  message: "Values should not be same",
  path: ["phoneHeader"]
}).refine((values) => {
  const condition = values.phoneHeader !== values.discordId && values.phoneHeader !== values.nameHeader && values.nameHeader !== values.discordId
  return condition
}, {
  message: "Values should not be same",
  path: ["nameHeader"]
}).refine((values) => {
  const condition = values.phoneHeader !== values.discordId && values.phoneHeader !== values.nameHeader && values.nameHeader !== values.discordId
  return condition
}, {
  message: "Values should not be same",
  path: ["discordId"]
});

function SelectHeadersForm({ sheetHeaders }: { sheetHeaders: string[] }) {
  const [headers, setHeaders] = useState<string[]>([])

  useEffect(() => {
    setHeaders(sheetHeaders)
  }, [sheetHeaders])
  const form = useForm<z.infer<typeof HeadersformSchema>>({
    resolver: zodResolver(HeadersformSchema),
    reValidateMode: "onChange",
  });

  function handleSubmit(data: z.infer<typeof HeadersformSchema>) {
    console.log(data)
  }

  return <>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <h1>Select Headers from following </h1>
        <FormField
          control={form.control}
          name="nameHeader"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {headers.map((header) => {
                    return header && <SelectItem value={header} key={header}>{header}</SelectItem>
                  })}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <span className="my-4 block" ></span>
        <FormField
          control={form.control}
          name="phoneHeader"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number Header</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {headers.map((header) => {

                    return header && <SelectItem value={header} key={header}>{header}</SelectItem>

                  })}

                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <span className="my-4 block" ></span>

        <FormField
          control={form.control}
          name="discordId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discord Id Header</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {headers.map((header) => {

                    return header && <SelectItem value={header} key={header}>{header}</SelectItem>

                  })}

                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />



        <div className="flex justify-end">
          <Button
            type="submit"
            className="ml-auto mt-2 "
          // disabled={isLoading}
          >
            {/* {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Get Headers"
            )} */}
            sibmit
          </Button>
        </div>
      </form>
    </Form>
  </>
}


export default function AddDataCell() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
  });



  const { api } = useAxiosApi();
  const currentSheet = useNewServerStore((s) => s.googleSheet);
  const updateCells = useNewServerStore((s) => s.replaceCells);
  const [headersList, setHeadersList] = useState<string[]>([])

  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["google-sheet-setup"],
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const res = await api.get("/sheetHeaders", {
        params: {
          spreadSheetUrl: currentSheet.url,
          sheetName: currentSheet.selectedSheet.title,
          headerRow: data.heagersRow,
        },
      });
      // return res.data;
      return res.data as { data: string[] };
    },
    onSuccess: (data) => {
      setHeadersList(data.data)
    },

    onError: (error: any) => {
      toast({
        title: error.response?.data.message || error.message,
        variant: "destructive",
      });
    },
  });

  // handler
  function onSubmit(values: z.infer<typeof formSchema>) {

    mutate(values);
  }

  return (
    <>
      <div className="flex h-full flex-col items-center justify-between text-sm">
        <div>
          <Link
            href={"./select-sheet"}
            className="self-start justify-self-start"
          >
            <Button variant={"outline"} className="mb-4">
              <ArrowLeft className="mr-4" /> Back
            </Button>
          </Link>
          <Card className="h-fit w-fit self-center p-4">
            <h1 className="mb-4 text-3xl">Headers Selections</h1>
            <ExampleDialog
              title="For more details click here"
              className="w-full"
            >
              You can identify the Cell with{" "}
              <span className="underline">first entry</span> of each type as
              shown in image below
              <ul className="list-inside">
                <span className="mb-2 mt-4 block text-lg underline decoration-primary">
                  In this Example,
                </span>
                <li>- Email Cell = B3</li>
                <li>- Phone Cell = C3</li>
                <li>- Discord Cell = B3</li>
              </ul>
              <Image src={explaneLayout} alt="column and row understand" />
            </ExampleDialog>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>

                <FormField
                  control={form.control}
                  name="heagersRow"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Row number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="for example. 2"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the row number where all the headers are located
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="ml-auto mt-4 "
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Get Headers"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
            {headersList.length ? <SelectHeadersForm sheetHeaders={headersList} /> : <></>}

          </Card>
        </div>
      </div>
    </>
  );
}
