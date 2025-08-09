"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetEpisodeQuery } from "@/redux/api/anime/anime-episode-api";
import { useGetAnimeQuery } from "@/redux/api/anime/anime-api";
import { useGetMovieQuery } from "@/redux/api/anime/anime-movie-api";
import Skeleton from "@/components/layout/skeleton-card";
import { updateEpisode } from "@/helpers/storage-episode";
import { useState, useEffect } from "react";
import DisqusComments from "./components/disqus";
import TVSeries from "./components/tv-series";
import Movie from "./components/movie";

export default function AnimeEpisodesPage() {
  const router = useRouter();
  const params = useParams<{ slug: string; episodes?: string }>();
  const episodeNum = params.episodes ? Number(params.episodes) : null;
  const [provider, setProvider] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  const isMovie = isNaN(Number(params.episodes));

  const movieQuery = useGetMovieQuery({ slug: params.slug });
  const episodeQuery = useGetEpisodeQuery({ slug: params.slug, episode: params.episodes });

  const dataEpisode = isMovie ? movieQuery.data : episodeQuery.data;
  const errorEpisode = isMovie ? movieQuery.isError : episodeQuery.isError;
  const loadingEpisode = isMovie ? movieQuery.isLoading : episodeQuery.isLoading;

  const { data: dataAnime, error: errorAnime, isLoading: loadingAnime } = useGetAnimeQuery(params.slug);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loadingEpisode || loadingAnime) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="aspect-video w-full animate-pulse rounded-2xl bg-muted/60"></div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-10 animate-pulse rounded-lg bg-muted/50"></div>
          ))}
        </div>
      </div>
    );
  }

  if (errorEpisode || errorAnime) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-red-500">Oops! Something went wrong.</h2>
        <p className="mt-2 text-muted-foreground">Failed to load episode. Please try again later.</p>
      </div>
    );
  }

  const handleAnimeEpisode = (episode: number) => {
    router.push(`/anime/${params.slug}/episodes/${episode}`);
  };

  const title = dataAnime?.data?.title || "Unknown Title";
  const currentEpisode = isMovie ? "Movie" : `Episode ${episodeNum}`;

  return (
    <section
      className={`container mx-auto px-4 pb-12 pt-6 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Header */}
      <div className="mb-6 space-y-2 text-center">
        <h1 className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl md:text-4xl">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {currentEpisode}
        </p>
      </div>

      {/* Video Player Section */}
      <div className="relative mb-8 rounded-2xl shadow-lg ring-1 ring-border/50">
        {isMovie ? (
          <Movie
            links={movieQuery?.data?.data?.downloadLinks}
            defaultLink={movieQuery?.data?.data?.iframeSrc}
            title={title}
          />
        ) : (
          <TVSeries
            dataAnime={dataAnime}
            dataEpisode={dataEpisode}
            episodeNum={episodeNum}
            handleAnimeEpisode={handleAnimeEpisode}
            provider={provider}
            router={router}
            setProvider={setProvider}
            updateEpisode={updateEpisode}
          />
        )}
      </div>

      {/* Navigation Tips */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Use the navigation below to switch episodes.
      </div>

      {/* Comments (Disabled) */}
      {/* <DisqusComments
        post={{
          slug: params.slug,
          episodes: params.episodes,
          title: dataEpisode?.data?.episode,
        }}
      /> */}
    </section>
  );
}
