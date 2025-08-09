"use client";

import { useParams, notFound } from "next/navigation";
import { useGetAnimeQuery } from "@/redux/api/anime/anime-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Skeleton from "@/components/layout/skeleton-card";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AnimeRecommendations from "./_components/anime-recommendations";
import { saveEpisode } from "@/helpers/storage-episode";
import Typography from "@/components/ui/typography";

export default function AnimeSlugPage() {
  const router = useParams();
  const [isVisible, setIsVisible] = useState(false);

  const {
  data: dataAnime,
  error: errorAnime,
  isLoading: loadingAnime,
} = useGetAnimeQuery(router.slug);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loadingAnime) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton />
      </div>
    );
  }

  if (errorAnime) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-center text-lg text-red-500">Error fetching data. Please try again.</p>
      </div>
    );
  }

    if (dataAnime?.data === undefined) return notFound();

  const anime = dataAnime.data;

  return (
    <section
      className={`container mx-auto px-4 py-8 transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Main Anime Card */}
      <Card className="overflow-hidden rounded-2xl border border-border/50 bg-card/70 shadow-xl backdrop-blur-sm dark:border-gray-800">
        {/* Header */}
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-extrabold text-foreground md:text-4xl">
            {anime.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Poster */}
            <div className="relative aspect-[2/3] w-full max-w-xs overflow-hidden rounded-xl shadow-md lg:w-1/3">
              <Image
                src={anime.poster}
                alt={anime.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                quality={85}
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4 lg:ml-6">
              <Typography.P className="text-muted-foreground leading-relaxed">
                {anime.synopsis || "No synopsis available."}
              </Typography.P>

              <div className="flex flex-wrap gap-3 pt-2">
                <Badge variant="outline" className="bg-purple-100/60 text-purple-700 dark:bg-purple-900/30">
                  ⭐ {anime.rating || "–"}
                </Badge>
                <Badge variant="outline" className="bg-blue-100/60 text-blue-700 dark:bg-blue-900/30">
                  🎬 {anime.type}
                </Badge>
                <Badge variant="outline" className="bg-green-100/60 text-green-700 dark:bg-green-900/30">
                  🟢 {anime.status}
                </Badge>
              </div>

              {/* Genres */}
              <div className="pt-2">
                <Typography.P className="font-medium text-foreground">Genres:</Typography.P>
                <div className="mt-2 flex flex-wrap gap-2">
                  {anime.genres.map((genre: any) => (
                    <Link
                      key={genre.slug}
                      href={`/genres/${genre.slug}?page=1`}
                      className="transition-transform hover:scale-105"
                    >
                      <Badge
                        variant="secondary"
                        className="rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 text-purple-700 hover:from-purple-200 hover:to-pink-200 dark:from-purple-900/40 dark:to-pink-900/40 dark:text-purple-200"
                      >
                        {genre.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Episode List */}
          <div className="mb-6">
            <h3 className="mb-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-xl font-bold text-transparent">
              Episodes
            </h3>
            <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {anime.episode_lists.map((episode: any, index: number) => {
                const episodeUrl =
                  anime.type === "TV" || anime.type === "BD"
                    ? `/anime/${router.slug}/episodes/${episode.episode_number}`
                    : `/anime/${router.slug}/episodes/${episode.slug}`;

                return (
                  <Button
                    key={episode.slug}
                    variant="outline"
                    asChild
                    className="group flex w-full items-center justify-start gap-3 rounded-xl border border-border/40 bg-muted/30 px-4 py-3 text-left text-sm font-medium transition-all duration-300 hover:border-purple-300 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:shadow-md dark:border-gray-700 dark:hover:border-purple-700"
                  >
                    <Link
                      href={episodeUrl}
                      onClick={() =>
                        saveEpisode({
                          title: anime.title,
                          poster: anime.poster,
                          router: router.slug,
                          episode: episodeUrl,
                        })
                      }
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-xs font-bold text-white group-hover:scale-110">
                        {index + 1}
                      </span>
                      <span className="truncate font-sans">{episode.episode}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Recommendations */}
          {anime.recommendations && anime.recommendations.length > 0 && (
            <div>
              <h3 className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-xl font-bold text-transparent">
                Recommended Anime
              </h3>
              <AnimeRecommendations recommendations={anime.recommendations} />
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
