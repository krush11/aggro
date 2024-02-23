import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import validateUser from "./validateUser";
import { User } from "@/prisma/prisma";

export async function getUser() {
  const cookieStore = cookies();
  if (!cookieStore.get('auth-token')) redirect('/auth/login')

  const userID = await validateUser(cookieStore.get('auth-token').value)
  const user = await User.findUnique({
    where: { id: userID },
    select: {
      id: true, email: true, firstName: true, lastName: true, username: true,
      ToolUsers: {
        select: { tool: true },
        where: { userID: userID },
      }
    },
  })

  return user
}