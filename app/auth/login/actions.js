'use server'

import { User } from "@/prisma/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { SignJWT } from 'jose/dist/node/esm/jwt/sign';
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";

export async function login(_, formData) {
  const identity = formData.get('identity');
  const password = formData.get('password');

  try {
    const userByUsername = await User.findUnique({ where: { username: identity }, });
    const userByEmail = await User.findUnique({ where: { email: identity }, });
    const user = userByUsername || userByEmail;

    if (!user)
      return { status: 400, error: 'User not found' }

    if (!bcrypt.compareSync(password, user.password))
      return { status: 400, error: 'Invalid credentials' }

    const auth_token = await new SignJWT({ id: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1w')
      .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));

    cookies().set('auth-token', auth_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return { status: 200 }
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError)
      return { status: 400, error: err.message }

    return { status: 500, error: err.message }
  }
}

