"use client";

import { useGetGenresQuery } from "@/redux/api/anime/anime-genre-api";
import { Card } from "@/components/ui/card";
import SkeletonCard from "@/components/layout/skeleton-card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GenrePage() {
  const {
    data: dataGenres,
    error: errorGenres,
    isLoading: loadingGenres,
  } = useGetGenresQuery({});

  const [isVisible, setIsVisible] = useState(false);

  // Trigger animasi saat komponen muncul
  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loadingGenres) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <SkeletonCard />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/40 bg-card/60 p-6 text-center backdrop-blur-sm opacity-0 transition-all duration-500"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="mx-auto h-5 w-16 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (errorGenres) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-center text-lg text-red-500">Failed to load genres. Please try again.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-indigo-50/20 to-purple-50/20 dark:from-background dark:via-indigo-950/10 dark:to-purple-950/10">
      <div className="container mx-auto px-4 py-12 max-[640px]:px-6">
        {/* Header */}
        <div
          className={`mb-10 text-center opacity-0 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="mb-6 bg-gradient-to-r from-lime-400 via-cyan-500 to-blue-500 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl md:text-6xl">
            Discover Your&nbsp;
            <span className="from-purple-400 to-pink-500 bg-clip-text text-transparent">Anime Genres</span>
          </h2>
          <p className="text-base text-muted-foreground md:text-lg">
            Explore action, fantasy, romance, and slice-of-life. Find your perfect anime vibe.
          </p>
        </div>

        {/* Genre Grid */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {dataGenres?.data.map((genre: any, index: number) => (
            <Link
              href={`/genres/${genre.slug}?page=1`}
              key={genre.slug}
              className={`group block opacity-0 transition-all duration-700 hover:scale-105 hover:shadow-xl dark:hover:shadow-purple-500/10 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${100 + index * 60}ms` }}
            >
              <Card className="flex h-20 cursor-pointer items-center justify-center rounded-xl border border-border/50 bg-card/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-cyan-500/20 dark:border-gray-800">
                <span className="bg-gradient-to-r from-lime-400 via-cyan-500 to-blue-500 bg-clip-text text-sm font-bold text-transparent sm:text-base md:text-lg">
                  {genre.name}
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
