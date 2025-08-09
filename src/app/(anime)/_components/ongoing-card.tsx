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
  const lastWatched = getSavedEpisode();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

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
      <div className="container mx-auto px-4 py-6 text-center">
        <Card className="mx-auto max-w-md rounded-xl border border-dashed border-border/50 bg-muted/30 p-8 shadow-sm">
          <Typography.P className="text-base text-muted-foreground">
            🎬 You haven't watched any anime yet.
          </Typography.P>
          <Typography.P className="mt-1 text-sm text-muted-foreground/80">
            Your recently watched episodes will appear here.
          </Typography.P>
        </Card>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-6">
      {/* Header */}
      <Typography.H3 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center text-2xl font-bold text-transparent">
        🎯 Last Watched
      </Typography.H3>

      {/* Scrollable Cards - Container tidak terlalu lebar */}
      <div className="mx-auto max-w-5xl">
        <ScrollArea className="inline-block w-full whitespace-nowrap pb-2">
          <div className="flex space-x-5">
            {lastWatched.map((episode: any, index: number) => (
              <Link
                href={episode.episode}
                key={episode.router}
                className={`group block w-48 transform rounded-xl border border-border/40 bg-card/60 shadow-sm backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-xl dark:border-gray-800 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                {/* Poster */}
                <div className="relative aspect-[2/3] overflow-hidden rounded-t-xl">
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
      </div>

      {/* Delete All Button */}
      <div className="mt-6 flex justify-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-6 text-sm font-medium text-white hover:from-red-600 hover:to-pink-600"
            >
              {"Delete All"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg">{"Are you sure?"}</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-muted-foreground">
                {"This will permanently delete your watched history."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-sm">{"Cancel"}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAllEpisode}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600"
              >
                {"Continue"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
}
