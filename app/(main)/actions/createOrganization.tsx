"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createOrganization({ id, displayName }: { id: string; displayName: string }) {
  return await prisma.organization.create({
    data: {
      id: id,
      displayName: displayName,
    },
  });
}
