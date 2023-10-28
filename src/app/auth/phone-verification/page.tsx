"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import indiaFlag from "@/assets/in.svg";
import { ThemeToggle } from "@/components";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, X } from "lucide-react";

import { OtpDataType, otpDataAtom } from "@/store";
import { axios } from "@/utils/server";

import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

const PhoneNumberFormSchema = z.object({
  phoneNumber: z.coerce
    .number()
    .int()
    .min(1000000000, {
      message: "Phone Number Must be atlaeast 10 numbers long",
    })
    .max(9999999999, {
      message: "Phone Number Must be atlaeast 10 numbers long",
    }),
  countryCode: z.string().min(1, { message: "country code is required" }),
});

export default function PhoneVerification() {
  // -

  const router = useRouter();
  const { toast } = useToast();
  // const [auth, setAuth] = useLocalStorage("auth", "");
  const [, setOtpData] = useAtom(otpDataAtom);

  const form = useForm<z.infer<typeof PhoneNumberFormSchema>>({
    resolver: zodResolver(PhoneNumberFormSchema),
    reValidateMode: "onChange",
    defaultValues: {
      countryCode: "91",
    },
  });

  // hadnling form submission
  const { mutate: createOtp, isPending: isLoading } = useMutation({
    mutationKey: ["otp"],
    mutationFn: async (phone: number) => {
      const res = await axios.post(`/send-otp`, {
        phone: phone,
      });
      return res.data as OtpDataType;
    },
    onSuccess: (data) => {
      setOtpData(data);
      toast({
        title: `otp set to ${data.phone}`,
        duration: 3000,
      });
      router.push("./phoneverification/verifyotp");
    },
    onError: (error) => {
      toast({
        title: `Opps an error occured `,
        description: `${JSON.stringify(error?.message)}`,
        duration: 3000,
        variant: "destructive",
      });
    },
  });

  /* Handlers */

  function onSubmit(values: z.infer<typeof PhoneNumberFormSchema>) {
    createOtp(values.phoneNumber);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 flex h-screen w-full max-w-5xl flex-col items-center justify-center p-2 text-sm">
        <div className="mb-2 flex w-full max-w-md justify-end gap-2">
          <ThemeToggle />
        </div>
        <Card className="mx-5 mb-48 w-full max-w-md border-0 px-2 py-4 sm:mb-0  sm:w-full sm:border sm:p-4 sm:shadow-md md:p-6">
          <h1 className="mb-4 flex flex-col text-2xl sm:flex-row ">
            <div className="w-full">
              Phone Verification <br />
              <span className="text-lg opacity-75">Generate an OTP </span>
            </div>
            <div className="mt-2 sm:m-0">
              <Link href="/dashboard">
                <Button variant={"ghost"}>
                  <X />
                </Button>
              </Link>
            </div>
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-6 gap-2">
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Code</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="91">
                            <div className="flex w-full gap-2">
                              <Image
                                src={indiaFlag}
                                className=""
                                alt="india-flag"
                                height={24}
                                width={24}
                              />
                              <span>+91</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="col-span-4">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0000 0000 00"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your phone number here
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Generate OTP"
                  )}
                </Button>
                <Link href="/dashboard">
                  <Button className="w-full" variant={"secondary"}>
                    Skip Verification
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </main>
  );
}
