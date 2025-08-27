"use client";

import { useGetSchedulesQuery } from "@/redux/api/anime/anime-schedules-api";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import SkeletonCard from "@/components/layout/skeleton-card";

export default function SchedulesPage() {
  const { data: dataSchedules, error: errorSchedules, isLoading: loadingSchedules } =
    useGetSchedulesQuery({});

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loadingSchedules) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="mb-12">
          <SkeletonCard />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50 opacity-0 animate-in fade-in-0"
              style={{ animationDelay: `${150 + i * 50}ms` }}
            >
              <div className="h-7 w-1/2 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
              <div className="mt-5 space-y-3">
                {Array.from({ length: 3 }).map((__, idx) => (
                  <div
                    key={idx}
                    className="h-4 w-full rounded-md bg-gray-100 dark:bg-gray-800"
                  ></div>
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
        <p className="text-center text-lg text-red-500">
          Failed to load schedules. Please try again.
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-blue-50/30 dark:from-slate-950 dark:via-gray-900 dark:to-purple-950/20">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <div
          className={`text-center mb-14 opacity-0 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="mb-5 font-sans text-4xl font-extrabold tracking-tight text-gray-800 dark:text-white sm:text-5xl lg:text-6xl">
            Sync Up with
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              &nbsp;Anime
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Stay ahead of release times and never miss a new episode. Catch every anime on schedule!
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {dataSchedules?.data?.map((dayData: any, index: number) => (
            <div
              key={dayData?.title}
              className={`opacity-0 transition-all duration-700 ease-out transform-gpu ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${150 + index * 60}ms` }}
            >
              <Card className="group relative flex h-full flex-col rounded-2xl border border-gray-200/60 bg-white/70 shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-gray-700/70 dark:bg-gray-800/60 dark:shadow-gray-900/30">
                {/* Day Header with Gradient */}
                <div className="rounded-t-2xl bg-gradient-to-r from-purple-500/30 to-pink-500/30 px-6 py-4 text-center backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-300">
                    {dayData?.day}
                  </h3>
                </div>

                {/* Anime List */}
                <div className="flex-1 space-y-1 overflow-y-auto px-5 pb-5 pt-4 max-h-60">
                  {dayData?.anime_list?.length > 0 ? (
                    dayData.anime_list.map((anime: any) => (
                      <div
                        key={anime?.title}
                        className="cursor-default rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all duration-200 
                                   hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:text-purple-700 hover:font-semibold 
                                   hover:shadow-inner hover:scale-[1.02] dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 dark:hover:text-pink-200"
                      >
                        {anime?.anime_name}
                      </div>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 italic">
                      No anime today
                    </p>
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
