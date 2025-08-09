"use client";

import { useGetSchedulesQuery } from "@/redux/api/anime/anime-schedules-api";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import SkeletonCard from "@/components/layout/skeleton-card";

export default function SchedulesPage() {
  const { data: dataSchedules, error: errorSchedules, isLoading: loadingSchedules } =
    useGetSchedulesQuery({});

  // State untuk trigger animasi setelah komponen muncul
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animasi setelah render pertama
    setIsVisible(true);
  }, []);

  if (loadingSchedules) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="mb-12">
          <SkeletonCard />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="rounded-md border bg-muted/30 p-6 opacity-0 animate-in fade-in duration-700"
                 style={{ animationDelay: `${100 + i * 50}ms` }}>
              <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="mt-4 space-y-2">
                {Array.from({ length: 3 }).map((__, idx) => (
                  <div key={idx} className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (errorSchedules) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-center text-lg text-red-500">Failed to load schedules. Please try again.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-blue-50/30 dark:from-background dark:via-purple-950/10 dark:to-blue-950/10">
      <div className="container mx-auto px-4 py-12 max-[640px]:px-6">
        {/* Header dengan Fade-In */}
        <div
          className={`text-center mb-12 max-w-2xl sm:mx-auto md:max-w-3xl opacity-0 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
         <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
  Sync Up with
  <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 bg-clip-text text-transparent font-bold">
    &nbsp;Anime
  </span>
</h2>
          <p className="text-base text-muted-foreground md:text-lg">
            Stay ahead of release times and never miss a new episode. Catch every anime on schedule!
          </p>
        </div>

        {/* Anime Schedule Grid */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {dataSchedules?.data?.map((dayData: any, index: number) => (
            <div
              key={dayData?.title}
              className={`opacity-0 transition-all duration-700 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${150 + index * 60}ms` }}
            >
              <Card className="group relative flex h-full flex-col rounded-xl border border-border/60 bg-card/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-muted/60 hover:shadow-xl dark:border-gray-800">
                {/* Day Header */}
                <div className="rounded-t-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-5 py-3 text-center backdrop-blur-sm">
                  <CardTitle className="text-xl font-bold text-foreground/90">{dayData?.day}</CardTitle>
                </div>

                {/* Anime List */}
                <div className="flex-1 space-y-2 overflow-hidden px-4 pb-4 pt-5">
                  {dayData?.anime_list?.length > 0 ? (
                    dayData.anime_list.map((anime: any) => (
                      <Link
                        href={anime?.url}
                        target="_blank"
                        key={anime?.title}
                        className="block rounded px-2 py-1 text-sm font-medium text-foreground/80 transition-all duration-200 hover:bg-purple-100 hover:text-purple-700 hover:underline hover:underline-offset-4 dark:hover:bg-purple-900/30 dark:hover:text-purple-300"
                      >
                        {anime?.anime_name}
                      </Link>
                    ))
                  ) : (
                    <p className="px-2 py-1 text-sm text-muted-foreground">No anime today</p>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
