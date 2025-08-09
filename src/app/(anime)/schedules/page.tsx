"use client";

import { useGetSchedulesQuery } from "@/redux/api/anime/anime-schedules-api";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import SkeletonCard from "@/components/layout/skeleton-card";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const headerVariants = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const, // ✅ Rekomendasi: cubic bezier
    },
  },
};

export default function SchedulesPage() {
  const { data: dataSchedules, error: errorSchedules, isLoading: loadingSchedules } =
    useGetSchedulesQuery({});

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (loadingSchedules) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="mb-12">
          <SkeletonCard />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="rounded-md border bg-muted/30 p-6">
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="mt-4 space-y-2">
                {Array.from({ length: 3 }).map((__, idx) => (
                  <div
                    key={idx}
                    className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800"
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
        <p className="text-center text-lg text-red-500">Failed to load schedules. Please try again.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-blue-50/30 dark:from-background dark:via-purple-950/10 dark:to-blue-950/10">
      <div className="container mx-auto px-4 py-12 max-[640px]:px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 max-w-2xl text-center sm:mx-auto md:max-w-3xl"
        >
          <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-3xl font-extrabold leading-tight text-transparent sm:text-4xl md:text-5xl">
            Sync Up with <span className="from-blue-400 to-purple-500 bg-clip-text">Anime</span>
          </h2>
          <p className="text-base text-muted-foreground md:text-lg">
            Stay ahead of release times and never miss a new episode. Catch every anime on schedule!
          </p>
        </motion.div>

        {/* Anime Schedule Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
        >
          {dataSchedules?.data?.map((dayData: any, index: number) => (
            <motion.div key={dayData?.title} variants={itemVariants}>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
