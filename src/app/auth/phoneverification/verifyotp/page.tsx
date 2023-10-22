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
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

/* TODO
    Proper phone number validation
*/

// schema
const PhoneNumberFormSchema = z.object({
  phoneNumber: z.string().min(4, {
    message: "Must contain 4 digits",
  }),
});

export default function PhoneVerification() {
  /* Hooks */

  const params = useSearchParams();
  const router = useRouter();

  const { count, restart } = useCountDown(60, 1000);

  // phone number input form
  const phoneVerificatioForm = useForm<z.infer<typeof PhoneNumberFormSchema>>({
    resolver: zodResolver(PhoneNumberFormSchema),
    reValidateMode: "onChange",
  });

  /* Handlers */
  function onSubmit(values: z.infer<typeof PhoneNumberFormSchema>) {
    console.log(values);
    router.push("/");
  }

  function handleOtpRest() {
    //
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full h-screen max-w-5xl font-mono text-sm flex flex-col justify-center items-center">
        <div className=" max-w-md w-full">
          <Link href={"./"}>
            <Button variant={"outline"} className="mb-6">
              Go Back
            </Button>
          </Link>

          <Card className="p-6 shadow-md">
            <h1 className="text-2xl mb-4">
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
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <Input placeholder="1234" type="number" {...field} />
                      </FormControl>
                      <FormDescription>Enter your otp here</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Verify otp{" "}
                </Button>
              </form>
            </Form>
            <div className="mt-8">
              <Separator className="my-4" />
              <p className="text-center  mb-2">Regenerate after {count}</p>
              <Button
                className="w-full"
                variant={"outline"}
                disabled={count !== 0}
              >
                Resend otp
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
