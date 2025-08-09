import { OnGoingAnimeProps } from "@/types/ongoing-anime";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import SkeletonCard from "@/components/layout/skeleton-card";
import Typography from "@/components/ui/typography";

export default function OngoingCard({
  animeHeader,
  animeData,
  seeAllLink,
}: Readonly<{
  animeData: OnGoingAnimeProps[];
  seeAllLink: string | null | undefined;
  animeHeader: string | null | undefined;
}>) {
  if (!animeData) {
    return (
      <>
        <CardHeader className="text-center font-bold text-2xl text-white drop-shadow-md">
          {animeHeader}
        </CardHeader>
        <SkeletonCard />
      </>
    );
  }

  return (
    <>
      {/* Header dengan sedikit glow */}
      <CardHeader className="text-center font-bold text-2xl text-white drop-shadow-sm mb-1">
        {animeHeader}
      </CardHeader>

      {/* Grid Cards */}
      <div className="mx-2 grid gap-5 max-[640px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        {animeData?.map((anime: OnGoingAnimeProps) => (
          <Link href={`/anime/${anime.slug}`} key={anime.slug}>
            <Card className="group relative flex flex-col rounded-xl overflow-hidden border border-transparent bg-gradient-to-b from-background to-muted/60 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-primary/30 hover:shadow-primary/10 h-full transform-gpu">
              {/* Image Wrapper dengan Aspect Ratio dan Glow */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={anime.poster}
                  alt={anime.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 20vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-70" />

                {/* Badge - New Episode Indicator */}
                {anime.current_episode && (
                  <div className="absolute top-2 right-2 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow-md scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    EP {anime.current_episode}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-3 space-y-1.5 bg-transparent">
                {/* Judul */}
                <Typography.P className="font-bold text-white text-sm line-clamp-2 group-hover:text-primary-foreground transition-colors duration-300 drop-shadow-md">
                  {anime.title}
                </Typography.P>

                {/* Info */}
                <div className="space-y-0.5 text-xs">
                  <Typography.P className="text-primary/90 underline underline-offset-2 decoration-1">
                    {anime.current_episode} episodes
                  </Typography.P>
                  <Typography.P className="text-muted-foreground/90">
                    <span className="text-white/80 font-medium">Day:</span> {anime.release_day}
                  </Typography.P>
                  <Typography.P className="text-muted-foreground/90">
                    <span className="text-white/80 font-medium">Date:</span> {anime.newest_release_date}
                  </Typography.P>
                </div>
              </div>

              {/* Glow Effect saat hover */}
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-primary/10 to-transparent blur-md" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* See All Button - Modern Pill Style */}
      {seeAllLink && (
        <CardFooter className="mt-6 flex justify-end">
          <Button
            variant="outline"
            className="rounded-full px-6 py-2 text-sm font-semibold bg-background/80 backdrop-blur-sm border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <Link href={`/${seeAllLink}/1`}>See all →</Link>
          </Button>
        </CardFooter>
      )}
    </>
  );
}
