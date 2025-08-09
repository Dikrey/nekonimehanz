"use client";

import { getSavedEpisode, deleteAllEpisode } from "@/helpers/storage-episode";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import Typography from "@/components/ui/typography";
import { useEffect, useState } from "react";

export default function LastWatched() {
  const [isVisible, setIsVisible] = useState(false);
  const lastWatched = getSavedEpisode();
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDeleteAllEpisode = () => {
    toast.promise(
      new Promise<void>((resolve) => {
        deleteAllEpisode();
        resolve();
      }),
      {
        loading: "Deleting watched history...",
        success: "All episodes cleared!",
        error: "Failed to delete history",
        finally: () => router.refresh(),
      }
    );
  };

  if (lastWatched.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="rounded-2xl border border-dashed border-border/50 bg-muted/30 p-12 shadow-sm">
          <Typography.P className="text-lg text-muted-foreground">
            🎬 You haven't watched any anime yet.
          </Typography.P>
          <Typography.P className="mt-2 text-sm text-muted-foreground/80">
            Your recently watched episodes will appear here.
          </Typography.P>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <Typography.H3 className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-2xl font-bold text-transparent">
          🎯 Last Watched
        </Typography.H3>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="rounded-full px-4 text-sm font-medium transition-all hover:scale-105"
            >
              Delete All
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg">Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-muted-foreground">
                This will permanently delete your watched history.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-sm">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAllEpisode}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Scrollable Anime Cards */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-2">
          {lastWatched.map((episode: any, index: number) => (
            <Link
              href={episode.episode}
              key={episode.router}
              className={`group block transform rounded-xl border border-border/40 bg-card/60 shadow-sm backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-xl dark:border-gray-800 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              {/* Poster */}
              <div className="relative aspect-[2/3] w-48 overflow-hidden rounded-t-xl sm:w-52 md:w-56">
                <Image
                  src={episode.poster}
                  alt={episode.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Title */}
              <div className="p-3 text-center">
                <Typography.P className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  {episode.title}
                </Typography.P>
              </div>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-1" />
      </ScrollArea>
    </section>
  );
}
