'use server'

import { User } from "@/prisma/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from 'bcrypt';
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function createAccount(prevState, formData) {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = await User.create({
      data: { firstName, lastName, username, email, password: hash }
    });

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
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      const field = err.meta.target[0].charAt(0).toUpperCase() + err.meta.target[0].slice(1);
      return {
        status: 409,
        error: field + ' already exists. Please use a different ' + field + ' or try logging in.',
      }
    }

    console.log(err)
  }
}

