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

  const level = lastWatched.length;
  const maxLevel = 5000;
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
    <Card className="border-none shadow-xl rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900/70 to-gray-800/50 backdrop-blur-xl">
      {/* Header + Level */}
      <CardHeader className="text-center text-3xl font-extrabold relative text-white">
        🎬 Last Watched
        {level > 0 && (
          <span className="absolute right-4 top-4 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white text-sm px-4 py-1 rounded-full shadow-md animate-pulse">
            Level {level}
          </span>
        )}
      </CardHeader>

      {/* Progress Bar */}
      {level > 0 && (
        <div className="px-6 mb-6">
          <div className="w-full h-3 bg-gray-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-300 mt-1 text-center">
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
                ? "flex gap-5 px-4"
                : "py-6 text-center w-full"
            }`}
          >
            {lastWatched.length > 0 ? (
              lastWatched.map((episode: any) => (
                <Card
                  key={episode.router}
                  className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg hover:shadow-2xl hover:scale-[1.03] hover:rotate-[0.5deg] transition-all duration-500 backdrop-blur-lg"
                >
                  <Link href={episode.episode}>
                    <div className="relative overflow-hidden">
                      <Image
                        src={episode.poster}
                        className="object-cover w-60 h-40 sm:h-72 md:h-72 lg:h-72 rounded-t-xl transition-transform duration-500 hover:scale-110"
                        width={200}
                        height={100}
                        loading="lazy"
                        alt="Poster Last Watched"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-3">
                        <Typography.P className="text-white font-medium">
                          {episode.title}
                        </Typography.P>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))
            ) : (
              <Typography.P className="text-gray-400">
                No episode watched yet
              </Typography.P>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Delete All Button */}
        {lastWatched.length > 0 && (
          <div className="mt-6 flex justify-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="rounded-full px-8 py-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-gradient-to-r from-red-500 to-rose-600 text-white"
                >
                  🗑 Delete All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-900 text-white border border-white/10">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    This will delete all episodes you have watched.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAllEpisode}
                    className="bg-red-500 hover:bg-red-600"
                  >
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
