import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/ui/typography";
import { useEffect, useState } from "react";

export default function AnimeSearchCard({
  anime,
}: Readonly<{
  anime: any[];
}>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!anime || anime.length === 0) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <p className="text-center text-lg text-muted-foreground">Anime not found!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {anime.map((data: any, index: number) => (
          <Link
            href={`/anime/${data.slug}`}
            key={data.slug}
            className={`group block transform rounded-xl border border-border/40 bg-card/60 shadow-sm backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:border-gray-800 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            {/* Poster */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl">
              <Image
                src={data.poster}
                alt={data.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                quality={85}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-4 text-foreground">
              <h3 className="line-clamp-2 font-bold text-lg text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400">
                {data.title}
              </h3>

              <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                <Typography.P>
                  🟢 <span className="font-medium">Status:</span> {data.status || "Unknown"}
                </Typography.P>
                <Typography.P>
                  ⭐ <span className="font-medium">Rating:</span> {data.rating || "–"}
                </Typography.P>
              </div>

              {/* Genre Badges */}
              <div className="mt-3 flex flex-wrap gap-1">
                {data.genres?.slice(0, 3).map((genre: any) => (
                  <span
                    key={genre.slug}
                    className="rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-2.5 py-0.5 text-xs font-medium text-purple-700 shadow-sm transition-all hover:from-purple-200 hover:to-pink-200 dark:from-purple-900/40 dark:to-pink-900/40 dark:text-purple-200"
                  >
                    {genre.name}
                  </span>
                ))}
                {data.genres?.length > 3 && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    +{data.genres.length - 3}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
