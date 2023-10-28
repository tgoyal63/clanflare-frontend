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
import { Separator } from "@/components/ui/separator";
import { useCountDown } from "@/hooks";
import { OtpDataType, otpDataAtom } from "@/store";

import { ThemeToggle } from "@/components";
import { useToast } from "@/components/ui/use-toast";
import { axios } from "@/utils/server";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

/* TODO
    Proper phone number validation
*/

// schema
const PhoneNumberFormSchema = z.object({
  otp: z.coerce
    .number()
    .int()
    .min(100000, {
      message: "Phone Number Must contain 6 digits only",
    })
    .max(999999, {
      message: "Phone Number Must contain 6 digits only",
    }),
});

export default function PhoneVerification() {
  /* Hooks */

  const params = useSearchParams();
  const { count, restart } = useCountDown(32, 1000);
  const [otpData, setOtpData] = useAtom(otpDataAtom);
  const { toast } = useToast();
  const route = useRouter();

  // phone number input form
  const phoneVerificatioForm = useForm<z.infer<typeof PhoneNumberFormSchema>>({
    resolver: zodResolver(PhoneNumberFormSchema),
    reValidateMode: "onChange",
  });

  const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
    mutationFn: async (data: { otpData: OtpDataType; otp: number }) => {
      return axios.post("/verify-top", { ...data.otpData, otp: data.otp });
    },
    onSuccess: () => {
      toast({
        title: `otp verified`,
        duration: 3000,
      });
      route.push("/dashboard");
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

  // regenrate otp
  const { mutate: resetOtp, isPending: otpLoading } = useMutation({
    mutationKey: ["otp"],
    mutationFn: async (phone: number) => {
      const res = await axios.post(`/send-otp`, {
        phone: phone,
      });
      return res.data as OtpDataType;
    },
    onSuccess: (data) => {
      setOtpData(data);
      restart();
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
    console.log(values);
    if (otpData.phone !== 0) {
      verifyOtp({
        otpData,
        otp: values.otp,
      });
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 flex h-screen w-full max-w-5xl flex-col items-center justify-center text-sm">
        <div className=" w-full max-w-md">
          <div className="mb-6 flex items-center justify-between">
            <Link href={"./"}>
              <Button variant={"outline"} className="gap-2">
                <ArrowLeftIcon /> Go Back
              </Button>
            </Link>
            <ThemeToggle />
          </div>

          <Card className="p-6 shadow-md">
            <h1 className="mb-4 text-2xl">
              Verify OTP
              <p className="text-lg text-muted-foreground">
                {" "}
                a 4 digit otp was sent to {params.get("phoneNumber")}{" "}
              </p>
            </h1>
            <Form {...phoneVerificatioForm}>
              <form
                onSubmit={phoneVerificatioForm.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={phoneVerificatioForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123456"
                          maxLength={6}
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Enter your otp here</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {isVerifying ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Verify otp"
                  )}
                </Button>
              </form>
            </Form>
            <div className="mt-8">
              <Separator className="my-4" />
              <p className="mb-2  text-center">Regenerate after {count}</p>
              <Button
                className="w-full"
                variant={"outline"}
                disabled={count !== 0 || otpLoading}
                onClick={() => resetOtp(8319090326)}
              >
                {otpLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Resend otp"
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
