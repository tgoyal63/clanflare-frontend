// "use client";

// import { Steeper } from "@/components";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import { useNewServerStore } from "@/store";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useQuery } from "@tanstack/react-query";
// import { ArrowLeft, Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// // images
// import { useAxiosApi } from "@/hooks/useAxiosApi";
// import Link from "next/link";

// const mockData = ["cell1", "cell2", "cell3", "cell4", "cell5", "cell6"];

// const formSchema = z.object({
//   emailCell: z.string().min(1),
//   phoneCell: z.string().optional(),
// });

// export default function Test() {
//   const router = useRouter();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     reValidateMode: "onChange",
//   });

//   const { api } = useAxiosApi();

//   // store
//   const spreedSheetId = useNewServerStore((s) => s.googleSheet.url);
//   const selectedSheet = useNewServerStore((s) => s.googleSheet.selectedSheet);

//   const [error, setError] = useState({
//     state: false,
//     message:
//       "Email Cell and Phone Cell should not have same value, please select diffrent values",
//   });

//   const [headersData, setHeadersData] = useState<string[]>(["Saket"]);

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["sheet-headers"],
//     queryFn: async () => {
//       const res = await api.get(
//         `/sheet-headers?spreadSheetUrl=${spreedSheetId}&sheetId=${selectedSheet.sheetId}`,
//       );
//       setHeadersData(res.data.data);
//       return res.data as {
//         success: boolean;
//         data: string[];
//         message: string;
//       };
//     },
//   });
//   // handler

//   const sheetData = useNewServerStore((state) => state.googleSheet.allSheets);
//   const updateSelectedSheet = useNewServerStore(
//     (state) => state.updateSelectedSheet,
//   );
//   const [addNewLink, setAddNewLink] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [sheetId, setSheetId] = useState("");

//   function handleSelectChange(id: string) {
//     setSheetId(id);
//   }

//   function handleSubmit(index: string) {
//     const temp = sheetData[Number(index)];

//     updateSelectedSheet(temp);
//     router.push("./add-data-cells");
//   }

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     if (values.emailCell === values.phoneCell) {
//       form.setError("emailCell", {
//         message:
//           "Email Cell and Phone Cell should not have same value, please select diffrent values",
//       });
//       form.setError("phoneCell", {
//         message:
//           "Email Cell and Phone Cell should not have same value, please select diffrent values",
//       });
//     }
//     console.log(form.formState.errors);
//   }

//   return (
//     <>
//       <div className="flex h-full flex-col items-center justify-between text-sm">
//         <Steeper stepNum={3} />

//         <div>
//           <Link href={"./add-sheet"} className="self-start justify-self-start">
//             <Button variant={"outline"} className="mb-4">
//               <ArrowLeft className="mr-4" /> Back
//             </Button>
//           </Link>
//           <Card className="my-auto w-full max-w-lg p-6 shadow-md ">
//             <h1 className="mb-4 text-2xl">
//               Select the sheet which contains user data <br />
//               <span className="text-lg text-muted-foreground">
//                 your GoogleSheet has multiple sub sheets please select one
//               </span>
//               {addNewLink && (
//                 <Button
//                   variant={"ghost"}
//                   className="pl-1"
//                   onClick={() => setAddNewLink(false)}
//                 >
//                   Click here to selet
//                 </Button>
//               )}
//             </h1>
//             {/* SELECTER */}

//             {/* STEP -2 */}

//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="w-full space-y-6"
//               >
//                 <FormField
//                   control={form.control}
//                   name="emailCell"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email Cell</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue
//                               placeholder={
//                                 isLoading ? (
//                                   <Loader2 className="mx-auto animate-spin" />
//                                 ) : (
//                                   <>{"Select a verified email to display"}</>
//                                 )
//                               }
//                             />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {headersData.map(
//                             (value, i) =>
//                               value && (
//                                 <SelectItem value={value} key={i}>
//                                   {value}
//                                 </SelectItem>
//                               ),
//                           )}
//                         </SelectContent>
//                       </Select>
//                       <FormDescription>
//                         Select cell that contain emails of user
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="phoneCell"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Phone Number Cell (optional)</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                         disabled={true}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a verified email to display" />
//                           </SelectTrigger>
//                         </FormControl>

//                         <SelectContent>
//                           {headersData?.map(
//                             (value, i) =>
//                               value && (
//                                 <SelectItem value={value} key={i}>
//                                   {value}
//                                 </SelectItem>
//                               ),
//                           )}
//                         </SelectContent>
//                       </Select>
//                       <FormDescription>
//                         Cell that contains user phone numbers
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <span className="text-xl"></span>
//                 <Button type="submit">Submit</Button>
//               </form>
//             </Form>
//           </Card>
//         </div>
//       </div>
//     </>
//   );
// }
