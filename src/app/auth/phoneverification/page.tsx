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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

import { OtpDataType, otpDataAtom } from "@/store";
import { axios } from "@/utils/server";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";

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
  const params = useSearchParams();
  const token = params.get("token");
  const { toast } = useToast();
  const [jwt, setLocalVal] = useLocalStorage("jwt", "");
  const [, setOtpData] = useAtom(otpDataAtom);

  const form = useForm<z.infer<typeof PhoneNumberFormSchema>>({
    resolver: zodResolver(PhoneNumberFormSchema),
    reValidateMode: "onChange",
    defaultValues: {
      countryCode: "91",
    },
  });

  // if no token in param
  useEffect(() => {
    if (token) setLocalVal(token);
    else if (jwt) return;
    else router.push("/auth");
  });

  const { mutate: createOtp, isPending: isCreating } = useMutation({
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
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full h-screen max-w-5xl font-mono text-sm flex flex-col justify-center items-center">
        <Card className="p-4 mb-48 sm:mb-0 border-0 sm:border  w-screen md:p-6 max-w-md sm:w-full sm:shadow-md">
          <h1 className="text-2xl mb-4">
            Generate OTP, <br />
            <span className="text-lg">To Verify your Phone Number </span>
            {/* <span>{}</span> */}
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-6 gap-2">
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
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
                          <SelectItem value="91">+91</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="col-span-5">
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

              <Button type="submit" className="w-full" disabled={isCreating}>
                {isCreating ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Generate OTP"
                )}
              </Button>
            </form>
          </Form>
        </Card>
        <Toaster />
      </div>
    </main>
  );
}
