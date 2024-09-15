import type { StaticImageData } from "next/image";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

export function MovieCard({
  title,
  poster,
}: {
  title: string;
  poster: StaticImageData;
}) {
  return (
    <Card>
      <CardContent className="flex aspect-square flex-col justify-center gap-2 p-2">
        <Image src={poster} alt={title} className="rounded" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </CardContent>
    </Card>
  );
}
