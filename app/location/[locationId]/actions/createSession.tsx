"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createSession(locationId: number, formData: FormData) {
  return await prisma.session.create({
    data: {
      name: formData.get("name") as string,
      start: new Date().toISOString(),
      locationId: locationId,
    },
  });
}
