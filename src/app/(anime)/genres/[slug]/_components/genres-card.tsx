import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import SkeletonCard from "@/components/layout/skeleton-card";
import { GenresAnimeProps } from "@/types/genres-anime";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { useEffect, useState } from "react";

export default function GenresCard({
  animeHeader,
  animeData,
}: Readonly<{
  animeHeader: string | null | undefined;
  animeData: GenresAnimeProps[];
}>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!animeData) {
    return (
      <div className="container mx-auto mt-8">
        <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center text-3xl font-extrabold text-transparent">
          {animeHeader}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto mt-8 px-4">
      {/* Header */}
      <h2 className="mb-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-center text-3xl font-extrabold text-transparent sm:text-4xl">
        {animeHeader}
      </h2>

      {/* Anime Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {animeData.map((anime: GenresAnimeProps, index) => (
          <Link
            href={`/anime/${anime.slug}`}
            key={anime.slug}
            className={`group block transform rounded-xl border border-border/40 bg-card/60 shadow-sm backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:border-gray-800 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            {/* Poster */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl">
              <Image
                src={anime.poster}
                alt={anime.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                quality={85}
              />
              {/* Gradient Overlay di Bagian Bawah */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-4 text-foreground">
              <Typography.P className="line-clamp-2 font-bold text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400">
                {anime.title}
              </Typography.P>

              <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                <Typography.P>
                  🎬 <span className="font-medium">Episodes:</span> {anime.episode_count || "-"}
                </Typography.P>
                <Typography.P>
                  ⭐ <span className="font-medium">Rating:</span> {anime.rating || "-"}
                </Typography.P>
                <Typography.P>
                  🏢 <span className="font-medium">Studio:</span> {anime.studio || "-"}
                </Typography.P>
                <Typography.P>
                  🌸 <span className="font-medium">Season:</span> {anime.season || "-"}
                </Typography.P>
              </div>

              {/* Genre Badges */}
              <div className="mt-3 flex flex-wrap gap-1">
                {anime.genres.slice(0, 3).map((genre) => (
                  <Link
                    key={genre.slug}
                    href={`/genres/${genre.slug}?page=1`}
                    className="transition-transform hover:scale-105"
                  >
                    <Badge
                      variant="outline"
                      className="border-purple-300 bg-purple-100/60 text-purple-700 hover:bg-purple-200 dark:border-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                    >
                      {genre.name}
                    </Badge>
                  </Link>
                ))}
                {anime.genres.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{anime.genres.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
