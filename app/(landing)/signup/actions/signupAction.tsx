"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface SignupSchema {
  name: string;
  email: string;
  password: string;
}

export const signupAction = async (formData: SignupSchema) => {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: formData.email },
  });

  if (existingUser) {
    throw new Error("Username already taken");
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(formData.password, 10);

  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      name: formData.name,
      email: formData.email,
    },
  });

  await prisma.accountCredential.create({
    data: {
      email: formData.email,
      password: hashedPassword,
      userId: newUser.id,
    },
  });

  return newUser;
};
