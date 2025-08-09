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
    <Card className="border-none shadow-lg rounded-2xl bg-background">
      <CardHeader className="text-center text-2xl font-bold pb-2">
        🎬 Last Watched
      </CardHeader>

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
                  className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-card border hover:border-primary"
                >
                  <Link href={episode.episode}>
                    <div className="relative w-full">
                      <Image
                        src={episode.poster}
                        alt="Poster Last Watched"
                        width={250}
                        height={350}
                        loading="lazy"
                        className="rounded-t-xl object-cover h-60 w-full sm:h-72 md:h-80"
                      />
                    </div>
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

        {lastWatched.length > 0 && (
          <div className="mt-4 flex justify-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="rounded-full px-6 shadow hover:shadow-lg transition-all"
                >
                  🗑 Delete All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete all episodes you have watched. This action
                    cannot be undone.
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
