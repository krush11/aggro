'use server'

import { user } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function createAccount(prevState, formData) {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const User = await user.create({
      data: { firstName, lastName, username, email, password: hash }
    });

    const token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 7 });

    return { status: 200, token }
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      const field = err.meta.target[0].charAt(0).toUpperCase() + err.meta.target[0].slice(1);
      return {
        status: 409,
        error: field + ' already exists. Please use a different ' + field + ' or try logging in.',
      }
    }
  }
}

