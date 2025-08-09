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
      <div className="mx-auto max-w-4xl rounded-2xl bg-gray-900/80 p-1 shadow-2xl">
        <div className="rounded-2xl bg-gray-950/90 p-5 backdrop-blur-sm">
          <CardHeader className="text-center text-xl font-bold text-white">
            {animeHeader}
          </CardHeader>
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-gray-900/60 p-1 shadow-xl">
      {/* Inner Card */}
      <div className="rounded-2xl bg-gray-950/90 p-5 backdrop-blur-sm">
        {/* Header */}
        <CardHeader className="text-center text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text sm:text-2xl">
          {animeHeader}
        </CardHeader>

        {/* Grid 2 Kolom di Mobile, 5 di Desktop */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {animeData.map((anime: OnGoingAnimeProps) => (
            <Link href={`/anime/${anime.slug}`} key={anime.slug}>
              <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/30 bg-gray-900/70 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10">
                {/* Poster */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={anime.poster}
                    alt={anime.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {anime.current_episode && (
                    <div className="absolute left-1 top-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-1.5 py-0.5 text-xs font-bold text-white">
                      EP {anime.current_episode}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 space-y-1 p-3 text-white">
                  <Typography.P className="line-clamp-2 text-xs font-bold text-white group-hover:text-purple-300 sm:text-sm">
                    {anime.title}
                  </Typography.P>
                  <Typography.P className="text-[10px] text-purple-200 sm:text-xs">
                    📅 {anime.current_episode} eps
                  </Typography.P>
                  <Typography.P className="text-[10px] text-gray-400 sm:text-xs">
                    🗓️ {anime.release_day || "Unknown"}
                  </Typography.P>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* See All Button */}
        {seeAllLink && (
          <CardFooter className="mt-6 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-purple-500/50 bg-purple-500/10 px-5 py-1 text-xs font-medium text-purple-300 backdrop-blur-sm hover:scale-105 hover:border-purple-400 hover:bg-purple-500/20 hover:text-purple-100 sm:px-6 sm:py-2 sm:text-sm"
            >
              <Link href={`/${seeAllLink}/1`}>See All →</Link>
            </Button>
          </CardFooter>
        )}
      </div>
    </div>
  );
}
