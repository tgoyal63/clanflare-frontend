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
  nameCol: z.string().min(1, {
    message: "required",
  }),
  emailCol: z.string().min(1, {
    message: "required",
  }),
  userRow: z.coerce.number().min(1, {
    message: "required",
  }),
  emailRow: z.coerce.number().min(1, {
    message: "required",
  }),
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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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
            <h1 className="text-3xl"> Enetr the Cell Details of sheet</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <h2 className="mb-2 mt-8">
                  <span className="font-bol block text-xl">Username Cells</span>
                </h2>
                <div className="flex gap-2">
                  <div>
                    <FormField
                      control={form.control}
                      name="nameCol"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Coulmn Letter</FormLabel>
                          <FormControl>
                            <Input placeholder="a" {...field} />
                          </FormControl>
                          <FormDescription>a-z or A-Z</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="userRow"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Row Number</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="1" {...field} />
                          </FormControl>
                          <FormDescription>1-1000000</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <h2 className="mb-2 mt-8">
                  <span className="font-bol block text-xl">
                    User Emails Cells
                  </span>
                </h2>
                <div className="flex gap-2">
                  <div>
                    <FormField
                      control={form.control}
                      name="emailCol"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Coulmn Letter</FormLabel>
                          <FormControl>
                            <Input placeholder="b" {...field} />
                          </FormControl>
                          <FormDescription>a-z or A-Z</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="emailRow"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Row Number</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="1" {...field} />
                          </FormControl>
                          <FormDescription>1-1000000</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
