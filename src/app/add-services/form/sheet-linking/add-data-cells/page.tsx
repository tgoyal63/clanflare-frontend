"use client";

import { ExampleDialog, Steeper } from "@/components";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

// images
import explaneLayout from "@/assets/col&rowExplan.webp";
import explaneNumber from "@/assets/col&rowNum.webp";
import Link from "next/link";
import { useAxiosApi } from "@/hooks/useAxiosApi";
import { useNewServerStore } from "@/store";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";

const formSchema = z.object({
  phoneNumberCell: z
    .string()
    .regex(/^[a-zA-Z]+[0-9]+$/, "invalid input")
    .toUpperCase(),
  emailCell: z
    .string()
    .regex(/^[a-zA-Z]+[0-9]+$/, "invalid input")
    .toUpperCase(),
  discordCell: z
    .string()
    .regex(/^[a-zA-Z]+[0-9]+$/, "invalid input")
    .toUpperCase(),
});

export default function Test() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
  });

  const { api } = useAxiosApi();
  const currentSheet = useNewServerStore((s) => s.googleSheet);
  const updateCells = useNewServerStore((s) => s.replaceCells);

  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["google-sheet-setup"],
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const res = await api.get("/validate-sheet-headers", {
        params: {
          spreadSheetUrl: currentSheet.url,
          sheetId: currentSheet.selectedSheet.sheetId,
          phoneCell: data.phoneNumberCell,
          emailCell: data.emailCell,
          discordIdCell: data.discordCell,
        },
      });
      // return res.data;
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      // save data to store
      updateCells({
        userDiscordId: data.discordCell,
        userEmail: data.emailCell,
        userPhone: data.phoneNumberCell,
      });
      router.push(`/add-services/form/bot-roles`);
    },

    onError: (error: AxiosError) => {
      console.log(error);
      toast({
        title: error.response?.data.message || error.message,
        variant: "destructive",
      });
    },
  });

  // handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.emailCell === values.phoneNumberCell) {
      form.setError("phoneNumberCell", {
        message: "multiple field's cant have same value",
      });
      form.setError("emailCell", {
        message: "multiple field's cant have same value",
      });
      form.setError("discordCell", {
        message: "multiple field's cant have same value",
      });
      return;
    }
    mutate(values);
  }

  return (
    <>
      <div className="flex h-full flex-col items-center justify-between text-sm">
        <Steeper setpNumber={3} />

        <div>
          <Link
            href={"/add-services/form"}
            className="self-start justify-self-start"
          >
            <Button variant={"outline"} className="mb-4">
              <ArrowLeft className="mr-4" /> Back
            </Button>
          </Link>
          <Card className="h-fit w-fit self-center p-4">
            <h1 className="mb-4 text-3xl"> Enetr the Cell Details of sheet</h1>
            <ExampleDialog
              title="For more details click here"
              className="w-full"
            >
              <p className="mb-2 mt-6">
                Here emails start from <span className="font-bold">Row 3</span>{" "}
                of <span>column B</span>
                therer fore
              </p>
              <ul className="list-disc  pl-6">
                <p className="font-semibold">In User email cells input</p>
                <li>Column Letter = b</li>
                <li>Row Number = 3</li>
              </ul>
              <Image
                src={explaneNumber}
                className="my-4"
                alt="column and row understand"
              />
              <Image src={explaneLayout} alt="column and row understand" />
            </ExampleDialog>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-rows-2 gap-2">
                  <FormField
                    control={form.control}
                    name="phoneNumberCell"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number Cel</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full"
                            placeholder="c2"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>example. c3</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="emailCell"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Cell</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="a3" {...field} />
                        </FormControl>
                        <FormDescription>ex. C1</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="discordCell"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Discord Id cell{" "}
                        <span className="italic">
                          (here user's discord id will be stored)
                        </span>{" "}
                      </FormLabel>
                      <FormControl>
                        <Input className="w-full" placeholder="c2" {...field} />
                      </FormControl>
                      <FormDescription>example. c3</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex">
                  <Button
                    type="submit"
                    className="ml-auto mt-6 w-full md:w-fit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
}
