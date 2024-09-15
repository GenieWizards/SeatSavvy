import arm from "@/assets/arm.webp";
import deadpoolAndWolverine from "@/assets/Deadpool and Wolverine.webp";
import joker from "@/assets/joker.webp";
import stree2 from "@/assets/stree-2.webp";
import tumbbad from "@/assets/tumbbad.webp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";

import { MovieCard } from "./movie-card";

const moviesData = [
  {
    title: "Arm",
    poster: arm,
  },
  {
    title: "Tumbbad",
    poster: tumbbad,
  },
  {
    title: "Stree 2",
    poster: stree2,
  },
  {
    title: "Seadpool and Wolverine",
    poster: deadpoolAndWolverine,
  },
  {
    title: "Joker",
    poster: joker,
  },
];

export function CardSection() {
  return (
    <Container>
      <Carousel
        opts={{
          align: "start",
        }}
        className="max-w-[250px] sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
      >
        <CarouselContent>
          {moviesData.map((movie) => (
            <CarouselItem
              key={movie.title}
              className="sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
            >
              <div className="p-1">
                <MovieCard title={movie.title} poster={movie.poster} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Container>
  );
}
