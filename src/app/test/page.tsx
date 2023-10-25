"use client";

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
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  nameCol: z.string().min(1, {
    message: "required",
  }),
  emailCol: z.string().min(1, {
    message: "required",
  }),
  userRow: z.string().min(1, {
    message: "required",
  }),
  emailRow: z.string().min(1, {
    message: "required",
  }),
});

export default function Test() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <Card className="p-4 w-fit h-fit">
        <h1 className="text-3xl"> Enetr the Cell Details of sheet</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <h2 className="mt-8 mb-2">
              <span className="block text-xl font-bol">Username Cells</span>
            </h2>
            <div className="flex gap-2">
              <div>
                <FormField
                  control={form.control}
                  name="emailCol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coulmn Number</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
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
                  name="emailCol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Row Number</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>1-1000000</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <h2 className="mt-8 mb-2">
              <span className="block text-xl font-bol">User Emails Cells</span>
            </h2>
            <div className="flex gap-2">
              <div>
                <FormField
                  control={form.control}
                  name="emailCol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coulmn Number</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
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
                  name="emailCol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Row Number</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>1-1000000</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" className="mt-6">
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
}

// <div className="grid grid-cols-8">
//   <div className="grid grid-rows-3">
//     <div></div>
//     <label>username</label>
//     <label>email</label>
//   </div>
//   <div className="grid col-span-7 grid-cols-2 grid-rows-3 gap-4">
//     <div>Row</div>
//     <div>Column</div>
//     <div>
//       <Input />
//       <span>any number</span>
//     </div>
//     <div>
//       <Input />
//       <span>any number</span>
//     </div>{" "}
//     <div>
//       <Input />
//       <span>any number</span>
//     </div>{" "}
//     <div>
//       <Input />
//       <span>any number</span>
//     </div>
//   </div>
// </div>
// <Button className="w-full mt-4">Continue</Button>
