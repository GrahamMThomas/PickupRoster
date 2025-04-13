import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Game } from "@prisma/client";
import MatchClock from "./MatchClock";
import MatchView from "./MatchView";
import ProposedMatchView from "./ProposedMatchView";

export default function MatchCarousel({ sessionId, games }: { sessionId: number; games: Game[] }) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {games
          .filter((x) => x.status != GameStatus.NOT_STARTED)
          .map(async (game, index) => {
            return (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <CardTitle className="text-4xl font-semibold">Game {index}</CardTitle>
                    <MatchClock start={game.start} end={game.end} />
                    <MatchView game={game} />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        <CarouselItem>
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <CardTitle className="text-4xl font-semibold">Next Game</CardTitle>
              <ProposedMatchView sessionId={sessionId} />
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
