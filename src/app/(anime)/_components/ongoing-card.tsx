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
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/70 to-black/80 p-1 shadow-2xl">
        <div className="relative rounded-2xl bg-gray-950/90 p-6 backdrop-blur-sm">
          <CardHeader className="text-center text-2xl font-extrabold text-white drop-shadow-lg">
            {animeHeader}
          </CardHeader>
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    // 🌟 WRAPPER UTAMA: Card dengan Glow & Shadow
    <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950/20 via-gray-900/50 to-black/60 p-1 shadow-2xl shadow-purple-500/10">
      {/* Inner Container */}
      <div className="relative rounded-2xl bg-gray-950/90 p-6 backdrop-blur-sm">
        {/* Header */}
        <CardHeader className="text-center text-2xl font-extrabold text-transparent drop-shadow-sm bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text">
          {animeHeader}
        </CardHeader>

        {/* Grid Cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {animeData?.map((anime: OnGoingAnimeProps) => (
            <Link href={`/anime/${anime.slug}`} key={anime.slug}>
              <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/40 bg-gradient-to-b from-gray-900/60 to-gray-800/40 shadow-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 dark:border-gray-700">
                {/* Image Wrapper */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={anime.poster}
                    alt={anime.title}
                    fill
                    sizes="(max-width: 440px) 50vw, (max-width: 508px) 33vw, (max-width: 1000px) 20vw, 16vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  {/* Badge: Episode */}
                  {anime.current_episode && (
                    <div className="absolute left-2 top-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-1 text-xs font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-110">
                      EP {anime.current_episode}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1.5 p-4 text-white">
                  <Typography.P className="line-clamp-2 text-sm font-bold text-white group-hover:text-purple-300">
                    {anime.title}
                  </Typography.P>
                  <div className="space-y-1 text-xs text-gray-300">
                    <Typography.P className="text-purple-200">
                      📅 {anime.current_episode} episodes
                    </Typography.P>
                    <Typography.P>
                      🗓️ <span className="text-gray-400">Day:</span> {anime.release_day || "Unknown"}
                    </Typography.P>
                    <Typography.P>
                      🕒 <span className="text-gray-400">Date:</span> {anime.newest_release_date || "–"}
                    </Typography.P>
                  </div>
                </div>

                {/* Glow Effect saat hover */}
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-purple-500/20 via-transparent to-pink-500/20 blur-xl" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* See All Button */}
        {seeAllLink && (
          <CardFooter className="mt-8 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="group rounded-full border-purple-500/50 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-6 py-2 text-sm font-semibold text-purple-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:bg-purple-500/20 hover:text-purple-100"
            >
              <Link href={`/${seeAllLink}/1`}>
                See All Anime →
              </Link>
            </Button>
          </CardFooter>
        )}
      </div>
    </div>
  );
}
