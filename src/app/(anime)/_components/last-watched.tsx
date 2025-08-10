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

export default function LastWatchedVertical() {
  const lastWatched = getSavedEpisode();
  const router = useRouter();

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
    <div className="max-w-5xl mx-auto p-4">
      <Card className="border-none shadow-xl rounded-2xl overflow-hidden bg-gradient-to-br from-[#1f1f2e] via-[#25253d] to-[#1a1a29] text-white">
        {/* Header */}
        <CardHeader className="text-center text-3xl font-extrabold py-6 border-b border-white/10">
          🎬 Last Watched
        </CardHeader>

        <CardContent className="p-6">
          {lastWatched.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-h-[70vh] overflow-y-auto pr-2">
              {lastWatched.map((episode: any) => (
                <div
                  key={episode.router}
                  className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all flex flex-col"
                >
                  <Link href={episode.episode}>
                    <Image
                      src={episode.poster}
                      alt={episode.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                  </Link>
                  <div className="p-4 flex flex-col flex-1">
                    <Typography.P className="text-lg font-semibold text-white mb-1">
                      {episode.title}
                    </Typography.P>

                    {episode.description && (
                      <p className="text-gray-300 text-sm line-clamp-3 mb-2">
                        {episode.description}
                      </p>
                    )}

                    {episode.genre && (
                      <p className="text-xs text-purple-300 mb-3">
                        {episode.genre.join(", ")}
                      </p>
                    )}

                    <div className="flex justify-between items-center mt-auto">
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
                </div>
              ))}
            </div>
          ) : (
            <Typography.P className="text-gray-400 text-center py-6">
              No episode watched yet
            </Typography.P>
          )}

          {/* Delete All Button */}
          {lastWatched.length > 0 && (
            <div className="mt-6 flex justify-center">
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
    </div>
  );
}
