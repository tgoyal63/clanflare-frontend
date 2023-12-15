import { redirect } from "next/navigation";

export default function Page() {
  redirect("/add-services/google-sheets/add-sheet?step=1");
}
