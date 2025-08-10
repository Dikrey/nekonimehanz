"use client";

import { getSavedEpisode, deleteAllEpisode } from "@/helpers/storage-episode";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
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
import Typography from "@/components/ui/typography";
import { useRouter } from "next/navigation";

export default function LastWatched() {
  const lastWatched = getSavedEpisode();
  const router = useRouter();

  // Sistem level
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
    <Card className="border-none shadow-xl rounded-2xl overflow-hidden bg-gradient-to-br from-[#1f1f2e] via-[#25253d] to-[#1a1a29] text-white max-w-4xl mx-auto">
      {/* Header + Level */}
      <CardHeader className="text-center text-3xl font-extrabold relative py-6">
        🎬 Last Watched
        {level > 0 && (
          <span className="absolute right-4 top-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm px-3 py-1 rounded-full shadow-md">
           Wibu Level {level}
          </span>
        )}
      </CardHeader>

      {/* Progress Bar */}
      {level > 0 && (
        <div className="px-6 mb-6">
          <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden backdrop-blur-md">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-300 mt-1 text-center">
            Level {level}/{maxLevel} Episodes to next level
          </p>
        </div>
      )}

      <CardContent>
        {lastWatched.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {lastWatched.map((episode: any) => (
              <Card
                key={episode.router}
                className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] overflow-hidden"
              >
                <Link href={episode.episode}>
                  <Image
                    src={episode.poster}
                    className="object-cover w-full h-48"
                    width={400}
                    height={200}
                    alt="Poster Last Watched"
                  />
                </Link>
                <div className="px-4 py-3">
                  <Typography.P className="text-lg font-semibold text-white truncate">
                    {episode.title}
                  </Typography.P>
                  {episode.description && (
                    <p className="text-gray-300 text-sm line-clamp-3 mt-1">
                      {episode.description}
                    </p>
                  )}
                  {episode.genre && (
                    <p className="text-xs text-purple-300 mt-2">
                      {episode.genre.join(", ")}
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-3">
                    <Link href={episode.episode}>
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-4 py-1 text-xs shadow hover:shadow-lg">
                        ▶ Continue
                      </Button>
                    </Link>
                    {episode.rating && (
                      <span className="text-yellow-400 text-sm">
                        ⭐ {episode.rating}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Typography.P className="text-gray-400 text-center py-8">
            No episode watched yet
          </Typography.P>
        )}

        {/* Delete All Button */}
        {lastWatched.length > 0 && (
          <div className="mt-8 flex justify-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="rounded-full px-6 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white shadow hover:shadow-lg hover:scale-105 transition-all"
                >
                  🗑 Delete All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#1f1f2e] text-white border border-white/20 rounded-xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-lg font-bold">
                    Are you sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-300">
                    This will delete all episodes you have watched.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAllEpisode}
                    className="bg-red-600 hover:bg-red-700 text-white"
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
