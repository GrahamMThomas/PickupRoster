"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createLocation(formData: FormData) {
  return await prisma.location.create({
    data: {
      name: formData.get("name") as string,
    },
  });
}
