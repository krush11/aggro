import { jwtVerify } from "jose"
import { redirect } from "next/navigation"

export default async function validateUser(token) {
  try {
    const userId = await jwtVerify(token, new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET), { algorithms: ['HS256'] })
    return userId.payload.id
  }
  catch (err) {
    console.error(err);
    if (err.code == 'ERR_JWT_EXPIRED')
      redirect('/auth/login')
  }
}