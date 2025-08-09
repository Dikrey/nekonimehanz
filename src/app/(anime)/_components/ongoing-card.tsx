import { OnGoingAnimeProps } from "@/types/ongoing-anime";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import SkeletonCard from "@/components/layout/skeleton-card";
import Typography from "@/components/ui/typography";
import { useEffect, useState } from "react";

export default function OngoingCard({
  animeHeader,
  animeData,
  seeAllLink,
}: Readonly<{
  animeData: OnGoingAnimeProps[];
  seeAllLink: string | null | undefined;
  animeHeader: string | null | undefined;
}>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!animeData) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center text-3xl font-extrabold text-transparent">
          {animeHeader}
        </h2>
        <SkeletonCard />
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-6">
      {/* Header */}
      <h2 className="mb-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-center text-3xl font-extrabold text-transparent">
        {animeHeader}
      </h2>

      {/* Anime Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {animeData.map((anime: OnGoingAnimeProps, index: number) => (
          <Link
            href={`/anime/${anime.slug}`}
            key={anime.slug}
            className={`group block transform rounded-xl border border-border/40 bg-card/60 shadow-sm backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:border-gray-800 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            {/* Poster */}
            <div className="relative aspect-[2/3] overflow-hidden rounded-t-xl">
              <Image
                src={anime.poster}
                alt={anime.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                quality={85}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              {/* Badge: New Episode */}
              <div className="absolute left-2 top-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
                EP {anime.current_episode}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 text-foreground">
              <Typography.P className="line-clamp-2 font-bold text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400">
                {anime.title}
              </Typography.P>

              <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                <Typography.P>
                  📅 <span className="font-medium">Day:</span> {anime.release_day || "Unknown"}
                </Typography.P>
                <Typography.P>
                  🕒 <span className="font-medium">Last:</span> {anime.newest_release_date || "–"}
                </Typography.P>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* See All Button */}
      {seeAllLink && (
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-2 text-sm font-medium text-purple-700 hover:from-purple-100 hover:to-pink-100 dark:border-purple-700 dark:from-purple-950/30 dark:to-pink-950/30"
          >
            <Link href={`/${seeAllLink}/1`}>See All Anime</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
