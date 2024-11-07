"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPlayer(name: string, locationId: number) {
  return await prisma.player.create({
    data: {
      name: name,
      locationId: locationId,
    },
  });
}
