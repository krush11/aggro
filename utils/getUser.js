const { cookies } = require("next/headers");
const { default: validateUser } = require("./validateUser");
const { User } = require("@/prisma/prisma");
const { redirect } = require("next/dist/server/api-utils");

export async function getUser() {
  const cookieStore = cookies();
  if (!cookieStore.get('auth-token')) redirect('/auth/login')
  const userID = await validateUser(cookieStore.get('auth-token').value)
  const user = await User.findUnique({ where: { id: userID } })
  return user
}
