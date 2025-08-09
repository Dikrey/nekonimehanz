"use client";

import OngoingCard from "../../_components/ongoing-card";
import OngoingPagination from "./components/ongoing-pagination";
import { useGetOnGoingAnimeQuery } from "@/redux/api/anime/anime-ongoing-api";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function OngoingAnimePage() {
  const path = usePathname();
  const pathSplit = path.split("/");
  const pageCurrent = pathSplit[2] || "1";

  const {
    data: dataOngoing,
    isError: errorOngoing,
    isLoading,
  } = useGetOnGoingAnimeQuery({ page: pageCurrent });

  const [isVisible, setIsVisible] = useState(false);

  // Trigger animasi setelah data muncul
  useEffect(() => {
    setIsVisible(true);
  }, [dataOngoing]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
            On Going Anime
          </h1>
          <p className="mt-3 text-muted-foreground">Loading latest episodes...</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] animate-pulse rounded-xl bg-muted/60"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (errorOngoing) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-center text-lg text-red-500">
          Failed to load ongoing anime. Please try again later.
        </p>
      </div>
    );
  }

  if (!dataOngoing || dataOngoing.data.ongoingAnimeData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-3xl font-extrabold text-transparent">
          No Ongoing Anime Found
        </h1>
        <p className="mt-3 text-muted-foreground">
          There are no ongoing anime available on this page.
        </p>
      </div>
    );
  }

  return (
    <section
      className={`min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-blue-50/20 px-4 py-8 dark:from-background dark:via-purple-950/10 dark:to-blue-950/10 ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            On Going Anime
          </h1>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            Catch the latest episodes as they air — never miss a moment!
          </p>
        </div>

        {/* Anime Cards */}
        <OngoingCard
          animeData={dataOngoing.data.ongoingAnimeData}
          animeHeader=""
          seeAllLink=""
        />

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <OngoingPagination ongoingData={dataOngoing.data.paginationData} />
        </div>
      </div>
    </section>
  );
}
