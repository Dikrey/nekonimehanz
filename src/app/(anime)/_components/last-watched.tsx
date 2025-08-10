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
    <Card className="border-none shadow-lg rounded-xl overflow-hidden max-w-5xl mx-auto">
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

      {/* List Episode in Grid */}
      <CardContent>
        {lastWatched.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto px-2">
            {lastWatched.map((episode: any) => (
              <Card
                key={episode.router}
                className="overflow-hidden rounded-xl border bg-card shadow-md hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                <Link href={episode.episode}>
                  <Image
                    src={episode.poster}
                    className="object-cover w-full h-48 sm:h-56 md:h-64"
                    width={500}
                    height={300}
                    loading="lazy"
                    alt={`Poster ${episode.title}`}
                  />
                </Link>
                <div className="p-4">
                  <Typography.P className="text-lg font-semibold mb-1 text-center">
                    {episode.title}
                  </Typography.P>
                  <p className="text-sm text-muted-foreground text-center">
                    {episode.description || "No description available."}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Typography.P className="text-muted-foreground text-center py-6">
            No episode watched yet
          </Typography.P>
        )}

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
