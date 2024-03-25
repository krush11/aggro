import { getUser } from "@/utils/getUser";
import { redirect } from "next/navigation";


export default async function Page() {
  const user = await getUser()

  redirect(user ? '/dashboard' : '/auth/login')
}
