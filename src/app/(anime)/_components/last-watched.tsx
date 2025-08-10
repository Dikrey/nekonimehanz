"use client";

import { getSavedEpisode, deleteAllEpisode } from "@/helpers/storage-episode";
import { Card } from "@/components/ui/card";
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
    <div className="max-w-4xl mx-auto p-4">
      {/* Header & Level */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <Typography.H2 className="text-center sm:text-left">
          Last Watched
        </Typography.H2>
        <div className="text-sm text-muted-foreground mt-2 sm:mt-0">
          Level: <span className="font-bold">{lastWatched.length}</span>
        </div>
      </div>

      {/* List Episode */}
      {lastWatched.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 max-h-[550px] overflow-y-auto pr-1">
          {lastWatched.map((episode: any) => (
            <Card
              key={episode.router}
              className="overflow-hidden rounded-xl border bg-card shadow-md hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              <Link href={episode.episode}>
                <Image
                  src={episode.poster}
                  className="object-cover w-full h-44 sm:h-56 md:h-64"
                  width={500}
                  height={300}
                  loading="lazy"
                  alt={`Poster ${episode.title}`}
                />
              </Link>
              <div className="p-3 sm:p-4">
                <Typography.P className="text-base sm:text-lg font-semibold mb-1 text-center">
                  {episode.title}
                </Typography.P>
                <p className="text-xs sm:text-sm text-muted-foreground text-center leading-snug">
                  {episode.description || "No description available."}
                </p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Typography.P className="text-center py-6">
          No episode watched yet
        </Typography.P>
      )}

      {/* Delete Button */}
      {lastWatched.length > 0 && (
        <div className="mt-6 flex justify-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete All</Button>
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
    </div>
  );
}
