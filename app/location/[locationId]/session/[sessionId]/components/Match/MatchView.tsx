import { Game, Player, PrismaClient } from "@prisma/client";
import PlayerTeamDisplay from "./PlayerTeamDisplay";

const prisma = new PrismaClient();

export default async function MatchView({ game }: { game: Game }) {
  const players = await prisma.gamePlayer.findMany({
    where: {
      gameId: game.id,
    },
    include: { Player: true },
  });

  const teamPlayerMapping = players.reduce<{ [key: string]: Player[] }>((acc, player) => {
    const noTeamKey: string = "None";
    if (!acc[noTeamKey]) {
      acc[noTeamKey] = [];
    }

    if (player.team == null) {
      acc[noTeamKey].push(player.Player);
      return acc;
    }

    if (!acc[player.team.toString()]) {
      acc[player.team.toString()] = [];
    }
    acc[player.team.toString()].push(player.Player);
    return acc;
  }, {});

  return <PlayerTeamDisplay teamPlayerMapping={teamPlayerMapping} />;
}
