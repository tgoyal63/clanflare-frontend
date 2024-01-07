"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import indiaFlag from "@/assets/in.svg";
import { Button } from "@/components/ui/button";
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
import { Loader2, PenLine } from "lucide-react";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { useAxiosApi } from "@/hooks/useAxiosApi";
import Image from "next/image";
import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { useCountDown } from "@/hooks";

import TagmangoImage from "@/assets/service-icons/tagmango-icon.svg";

const PhoneNumberFormSchema = z.object({
  phoneNumber: z.coerce
    .number()
    .int()
    .min(1000000000, {
      message: "Phone Number Must contain 10 digits",
    })
    .max(9999999999, {
      message: "Phone Number Must contain 10 digits",
    }),
  countryCode: z.string().min(1, { message: "country code is required" }),
});

const OtpSchema = z.object({
  otp: z.coerce
    .number()
    .int({ message: "Please enter valid otp" })
    .min(100000, {
      message: "OTP Number Must contain 6 digits only",
    })
    .max(999999, {
      message: "OTP Number Must contain 6 digits only",
    }),
});

export default function PhoneVerification() {
  const { api } = useAxiosApi();
  const { toast } = useToast();
  const params = useSearchParams()
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [temp, setTemp] = useState<{
    phone?: number;
  }>({});
  const { count, restart } = useCountDown(32, 1000);
  const router = useRouter()

  const form = useForm<z.infer<typeof PhoneNumberFormSchema>>({
    resolver: zodResolver(PhoneNumberFormSchema),
    reValidateMode: "onChange",
    defaultValues: {
      countryCode: "91",
    },
  });

  const otpVerificationForm = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    reValidateMode: "onChange",
  });

  // hadnling form submission
  const { mutate: createOtp, isPending: isLoading } = useMutation({
    mutationKey: ["otp"],
    mutationFn: async (values: z.infer<typeof PhoneNumberFormSchema>) => {
      const res = await api.post(`/customSolutions/${'gangstaPhilosophy'}/getOtp`, {
        phone: values.phoneNumber,
        domain: "app.gangstaphilosophy.com"
      });
      setTemp({ phone: values.phoneNumber })
      return res.data.data;
    },
    onSuccess: (data) => {
      toast({
        title: `otp set to ${temp}`,
        duration: 3000,
      });
      setIsOtpGenerated(true);
      restart(); // restart useCountDown
    },
    onError: (error: any) => {
      toast({
        title: error.response?.data.message || error.message,
        duration: 3000,
        variant: "destructive",
      });
    },
  });

  const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
    mutationFn: async (values: z.infer<typeof OtpSchema>) => {
      return await api.post(`/customSolutions/${'gangstaPhilosophy'}/verifyOtp`, { phone: temp.phone, otp: values.otp, domain: "app.gangstaphilosophy.com" });
    },
    onSuccess: (data) => {
      toast({
        title: `otp verified`,
        duration: 3000,
      });
      router.push(`/add-services/tag-mango/select-manog?id=${params.get("id") || ''}`)
    },
    onError: (error: any) => {
      toast({
        title: error.response?.data.message || error.message,
        duration: 3000,
        variant: "destructive",
      });
    },
  });

  function handleOtpReset() {
    if (temp.phone) {
      createOtp({
        phoneNumber: temp.phone,
        countryCode: "91",
      });
      return;
    }
    setIsOtpGenerated(false);
  }

  return (
    <>
      {!isOtpGenerated ? (
        <>
          {/* Phone number Form */}
          <h1 className="mb-4 flex  flex-row text-2xl ">
            <div className="w-full">
              <div className="mb-4 flex justify-center">
                <Image src={TagmangoImage} height={70} alt="Tagmango logo" />
              </div>
              <h1 className="mb-2 text-center">Phone Verification </h1>
              <h2 className="text-center text-lg ">
                <span className="opacity-80">
                  Enter Phone Number which you{" "}
                </span>
                <span className="rounded-t-md bg-emerald-300 px-1 py-1 text-black  opacity-100">
                  use in Tagmango
                </span>
              </h2>
            </div>
          </h1>

          <Form {...form}>
            {/* @ts-ignore */}
            <form onSubmit={form.handleSubmit(createOtp)} className="space-y-8">
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Generate OTP"
                )}
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <>
          {/* OTP form */}
          <h1 className="mb-4 text-2xl">
            Verify OTP
            <p className="text-lg text-muted-foreground">
              {" "}
              a 6 digit otp was sent to {temp.phone}
            </p>
            <button
              onClick={() => setIsOtpGenerated(false)}
              className="mt-2 inline-flex gap-2 border-transparent p-0 text-sm underline-offset-4  outline-transparent hover:underline"
            >
              <span>Edit number</span> <PenLine height={"1.2rem"} />
            </button>
          </h1>
          <Form {...otpVerificationForm}>
            <form
              /* @ts-ignore */
              onSubmit={otpVerificationForm.handleSubmit(verifyOtp)}
              className="space-y-8"
            >
              <FormField
                control={otpVerificationForm.control}
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
              disabled={count !== 0 || isLoading}
              onClick={handleOtpReset}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Resend otp"}
            </Button>
          </div>
        </>
      )}
    </>
  );
}
