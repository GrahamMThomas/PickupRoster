"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const loginAction = async (username: string, password: string) => {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });
  if (!existingUser) {
    throw new Error("Username not found.");
  }

  // Hash the password before saving
  //   const hashedPassword = await bcrypt.hash(password, 10);

  // Check if password matches
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password.");
  }
  // Return user data
  return existingUser;
};
