/* Authanticate with discord */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import { extractIdFromSheetUrl } from "@/utils/googlesheet";
import { useMutation } from "@tanstack/react-query";
import { Link, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// import imageCopylink  from "@/assets/tutorial/copy-link.webp"

const SheetFormSchema = z.object({
  url: z
    .string()
    .url("Invalid url")
    .refine(
      (url) => {
        return url.startsWith("https://docs.google.com/spreadsheets");
      },
      {
        message: "Not a valid google sheet url",
      },
    ),
});

export default function FormComponent() {
  const form = useForm<z.infer<typeof SheetFormSchema>>({
    resolver: zodResolver(SheetFormSchema),
    reValidateMode: "onChange",
  });
  const router = useRouter();

  //   const { toast } = useToast();
  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["google-sheet-setup"],
    mutationFn: async (data: any) => {
      //   const res = await axios("/", data);
      //   return res.data;
      return [];
    },
    onSuccess: () => {
      //
      router.push(`/add-services/form/`);
    },

    onError: () => {
      //
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SheetFormSchema>) {
    const sheetId = extractIdFromSheetUrl(values.url);
    // mutate(sheetId);
  }
  return (
    <div>
      {/* STEP -2 */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <h2 className="text-xl underline decoration-primary underline-offset-2">
            Step 2
          </h2>{" "}
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="items-center">
                  URL <Link className="inline-block h-4 w-4" />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="http://sheet.google/com"
                    type="url"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Paste the link of google sheet here
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "connect and continue"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
