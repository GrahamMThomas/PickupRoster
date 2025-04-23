import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SessionCard from "./SessionCard";
import { Card, CardContent } from "@/components/ui/card";

export default function SessionCarousel() {
  return (
    <div className="flex w-full items-center justify-center">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-[65%]"
      >
        <CarouselContent className="">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem className="" key={index}>
              <SessionCard />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
