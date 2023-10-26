import { redirect } from "next/navigation";

export default async function Profile() {
  console.log(process.env.BASE_AUTH_URL);
  redirect(process.env.NEXT_PUBLIC_BASE_API_URL + "/login");
}
