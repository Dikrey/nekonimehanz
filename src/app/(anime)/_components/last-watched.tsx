"use client";

import { getSavedEpisode, deleteAllEpisode } from "@/helpers/storage-episode";
import { Card, CardHeader } from "@/components/ui/card";
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
      }), {
      loading: "Deleting...",
      success: "Episodes have been deleted",
      error: "Failed to delete episodes",
      finally: () => router.refresh(),
    })
  };

  return (
    <Card className="border-none shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader className="flex flex-row items-center justify-between px-6 py-4 space-y-0">
        <Typography.H4 className="font-bold">Continue Watching</Typography.H4>
        {lastWatched.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
              >
                Clear All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove all your watched episodes from history.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteAllEpisode}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Clear History
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardHeader>
      
      <ScrollArea className="w-full pb-4">
        <div className={`${lastWatched.length > 0 ? "flex space-x-4 px-4" : "py-8 text-center"}`}>
          {lastWatched.length > 0 ? (
            lastWatched.map((episode: any) => (
              <Card
                key={episode.router}
                className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative">
                  <Link href={episode.episode}>
                    <Image
                      src={episode.poster}
                      className="rounded-t-lg object-cover aspect-[2/3] max-[640px]:h-40 sm:h-80 md:h-72 lg:h-72 xl:h-96 w-full"
                      width={200}
                      height={300}
                      loading="lazy"
                      alt={episode.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </div>
                <div className="p-3">
                  <Typography.P className="font-medium line-clamp-2 text-center group-hover:text-primary transition-colors">
                    {episode.title}
                  </Typography.P>
                </div>
              </Card>
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center space-y-4">
              <Typography.P className="text-muted-foreground">
                No watched episodes yet
              </Typography.P>
              <Button variant="outline" asChild>
                <Link href="/">
                  Start Watching
                </Link>
              </Button>
            </div>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  );
}
