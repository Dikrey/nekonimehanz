"use client";

import { getSavedEpisode, deleteAllEpisode } from "@/helpers/storage-episode";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
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

export default function LastWatched() {
  const lastWatched = getSavedEpisode();
  const router = useRouter();

  const level = lastWatched.length; // Level berdasarkan jumlah episode
  const maxLevel = 10; // Misalnya max level 10
  const progress = Math.min((level / maxLevel) * 100, 100);

  const handleDeleteAllEpisode = () => {
    toast.promise(
      new Promise<void>((resolve) => {
        deleteAllEpisode();
        resolve();
      }),
      {
        loading: "Deleting...",
        success: "Episodes have been deleted",
        error: "Failed to delete episodes",
        finally: () => router.refresh(),
      }
    );
  };

  return (
    <Card className="border-none shadow-lg rounded-xl overflow-hidden">
      {/* Header + Level */}
      <CardHeader className="text-center text-2xl font-bold relative">
        🎬 Last Watched
        {level > 0 && (
          <span className="absolute right-4 top-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm px-3 py-1 rounded-full shadow-md">
            Level {level}
          </span>
        )}
      </CardHeader>

      {/* Progress Bar */}
      {level > 0 && (
        <div className="px-6 mb-4">
          <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground mt-1 text-center">
            {level}/{maxLevel} Episodes to next level
          </p>
        </div>
      )}

      {/* List Episode */}
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div
            className={`${
              lastWatched.length > 0
                ? "flex gap-4 px-2"
                : "py-6 text-center w-full"
            }`}
          >
            {lastWatched.length > 0 ? (
              lastWatched.map((episode: any) => (
                <Card
                  key={episode.router}
                  className="overflow-hidden rounded-xl border bg-card shadow-sm hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  <Link href={episode.episode}>
                    <Image
                      src={episode.poster}
                      className="object-cover w-60 h-40 sm:h-72 md:h-72 lg:h-72 rounded-t-xl"
                      width={200}
                      height={100}
                      loading="lazy"
                      alt="Poster Last Watched"
                    />
                  </Link>
                  <ScrollArea className="px-3 py-2 w-60">
                    <Typography.P className="text-center font-medium">
                      {episode.title}
                    </Typography.P>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </Card>
              ))
            ) : (
              <Typography.P className="text-muted-foreground">
                No episode watched yet
              </Typography.P>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Delete All Button */}
        {lastWatched.length > 0 && (
          <div className="mt-4 flex justify-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="rounded-full px-6 shadow hover:shadow-lg hover:scale-105 transition-all"
                >
                  🗑 Delete All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete all episodes you have watched.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAllEpisode}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
