import { cookies } from "next/headers";
import validateUser from "./validateUser";
import { User } from "@/prisma/prisma";

export async function getUser() {
  const cookieStore = cookies();

  if (!cookieStore.get('auth-token'))
    return null

  const userID = await validateUser(cookieStore.get('auth-token').value)
  try {
    const user = await User.findUnique({
      where: { id: userID },
      select: {
        id: true, email: true, firstName: true, lastName: true, username: true,
        ToolUsers: {
          // populating tools to fetch value specially for navbar
          select: { tool: true },
          where: { userID: userID },
        }
      },
    })

    return user
  } catch (err) {
    return err
  }
}
