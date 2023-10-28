"use client";

import { Steeper } from "@/components";
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
import { axios } from "@/utils/server";
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

const formSchema = z.object({
  phoneNumberCell: z.string().regex(/^[a-zA-Z]+[0-9]+$/, "invalid input"),
  emailCell: z.string().regex(/^[a-zA-Z]+[0-9]+$/, "invalid input"),
});

export default function Test() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["google-sheet-setup"],
    mutationFn: async (data: any) => {
      const res = await axios("/", data);
      return res.data;
    },
    onSuccess: (data) => {
      //
      router.push(`/add-services/form/addingbotRoles`);
    },

    onError: (error) => {
      //
    },
  });

  // handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center gap-6">
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-rows-2 gap-2">
                  <FormField
                    control={form.control}
                    name="emailCell"
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
                    name="phoneNumberCell"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Cell</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="a3" {...field} />
                        </FormControl>
                        <FormDescription>example. a3</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
            <Card className="mt-4 p-2">
              <span className="text-xl"> Example </span>

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
            </Card>
          </Card>
        </div>
      </div>
    </>
  );
}
