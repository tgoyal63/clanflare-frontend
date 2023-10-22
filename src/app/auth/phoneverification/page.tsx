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

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

/* TODO
    Proper phone number validation
*/

const PhoneNumberFormSchema = z.object({
  phoneNumber: z.string().min(10, {
    message: "Phone Number Must be atlaeast 10 numbers long",
  }),
});

export default function PhoneVerification() {
  // phone number input form
  const phoneVerificatioForm = useForm<z.infer<typeof PhoneNumberFormSchema>>({
    resolver: zodResolver(PhoneNumberFormSchema),
    reValidateMode: "onChange",
  });
  const router = useRouter();
  const { toast } = useToast();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof PhoneNumberFormSchema>) {
    console.log(values);
    toast({
      title: `OTP setnt to ${values.phoneNumber}`,
      duration: 2000,
    });
    router.push(
      `./phoneverification/verifyotp?phoneNumber=${values.phoneNumber}`
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full h-screen max-w-5xl font-mono text-sm flex flex-col justify-center items-center">
        <Card className="p-6 max-w-md w-full shadow-md">
          <h1 className="text-2xl mb-4">
            Generate OTP, <br />
            <span className="text-lg">To Verify your Phone Number </span>
          </h1>
          <Form {...phoneVerificatioForm}>
            <form
              onSubmit={phoneVerificatioForm.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={phoneVerificatioForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
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
              <Button type="submit" className="w-full">
                Generate OTP
              </Button>
            </form>
          </Form>
        </Card>
        <Toaster />
      </div>
    </main>
  );
}
