import { PrismaClient, Location, Session, Player, Game } from "@prisma/client";
import SignInButton from "./components/SignInButton";
import MatchCarousel from "./components/Match/MatchCarousel";

const prisma = new PrismaClient();

export default async function Session({
  params,
}: {
  params: { locationId: string; sessionId: string };
}) {
  const locationId = parseInt(params.locationId);
  const sessionId = parseInt(params.sessionId);

  const allPlayers: Player[] = await prisma.player.findMany({
    where: {
      locationId: locationId,
    },
  });

  const location: Location | null = await prisma.location.findUnique({
    where: {
      id: locationId,
    },
  });

  const session: Session | null = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  });

  const games: Game[] | null = await prisma.game.findMany({
    where: {
      sessionId: sessionId,
    },
  });

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
      <h1>{location?.name}</h1>
      <h1>{session?.name}</h1>
      <h2>
        {session?.start.toDateString()} {session?.start.toLocaleTimeString()}
      </h2>
      <MatchCarousel games={games} />
      <SignInButton sessionId={sessionId} locationId={locationId} playerList={allPlayers} />
    </div>
  );
}
