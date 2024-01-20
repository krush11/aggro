'use server'

import { user } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function login(_, formData) {
  const identity = formData.get('identity');
  const password = formData.get('password');

  try {
    const userByUsername = await user.findUnique({ where: { username: identity }, });
    const userByEmail = await user.findUnique({ where: { email: identity }, });
    const User = userByUsername || userByEmail;

    if (!User || !bcrypt.compareSync(password, User.password))
      return { status: 400, error: 'Invalid credentials' }

    const token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 7 });
    return { status: 200, token }
  } catch (err) {
    console.log(err)
    if (err instanceof PrismaClientKnownRequestError) {
      return { status: 400, error: err.message }
    }
  }
}

