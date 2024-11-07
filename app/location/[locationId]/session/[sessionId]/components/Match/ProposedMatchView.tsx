import { Game, PrismaClient } from "@prisma/client";
import PlayerTeamDisplay from "./PlayerTeamDisplay";

const prisma = new PrismaClient();

export default async function ProposedMatchView({ sessionId }: { sessionId: number }) {
  const games: Game[] | null = await prisma.game.findMany({
    where: {
      sessionId: sessionId,
    },
  });

  const signIns = await prisma.attendanceLog.findMany({
    where: {
      sessionId: sessionId,
    },
  });

  return <PlayerTeamDisplay />;
}
