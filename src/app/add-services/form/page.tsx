import { redirect } from "next/navigation";

export default async function Profile() {
  console.log(process.env.BASE_AUTH_URL);
  redirect("./form/add-bot-to-server");
}
