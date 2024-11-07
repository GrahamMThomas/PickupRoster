"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function signIn(sessionId: number, playerId: number) {
  return await prisma.attendanceLog.create({
    data: {
      playerId: playerId,
      sessionId: sessionId,
      start: new Date().toISOString(),
    },
  });
}
