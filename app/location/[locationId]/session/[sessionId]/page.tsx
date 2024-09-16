import { PrismaClient, Player } from "@prisma/client";
import { useEffect } from "react";

const prisma = new PrismaClient();

export default function Session({ params }: { params: { locationId: string; sessionId: string } }) {
  const locationId = parseInt(params.locationId);
  const sessionId = parseInt(params.sessionId);

  //   const GetNextPlayersForGame = async () => {
  //     players = await prisma.player.findMany({
  //       where: {
  //         locationId: locationId,
  //       },
  //     });
  //     return players;
  //   };

  //   useEffect(() => {
  //     GetNextPlayersForGame();
  //   });

  return (
    <div>
      <h1>{locationId}</h1>
      <h1>{sessionId}</h1>
    </div>
  );
}
