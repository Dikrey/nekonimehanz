import { OnGoingAnimeProps } from "@/types/ongoing-anime";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import SkeletonCard from "@/components/layout/skeleton-card";
import Typography from "@/components/ui/typography";

export default function OngoingCard({
  animeHeader,
  animeData,
  seeAllLink,
}: Readonly<{
  animeData: OnGoingAnimeProps[];
  seeAllLink: string | null | undefined;
  animeHeader: string | null | undefined;
}>) {
  if (!animeData) {
    return (
      <>
        <CardHeader className="text-center font-bold text-2xl tracking-wide">
          {animeHeader}
        </CardHeader>
        <SkeletonCard />
      </>
    );
  }

  return (
    <>
      <CardHeader className="text-center font-bold text-2xl tracking-wide">
        {animeHeader}
      </CardHeader>

      <div className="mx-2 grid gap-4 max-[640px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        {animeData?.map((anime: OnGoingAnimeProps) => (
          <Link href={`/anime/${anime.slug}`} key={anime.slug}>
            <Card className="group overflow-hidden rounded-xl border border-border bg-card shadow-md transition-all duration-300 hover:shadow-lg hover:border-primary/40 h-full">
              <div className="relative overflow-hidden">
                <Image
                  src={anime.poster}
                  alt={anime.title}
                  className="object-cover w-full h-48 sm:h-72 md:h-72 lg:h-72 xl:h-96 rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                  width={1000}
                  height={1000}
                />
              </div>
              <div className="flex-1 space-y-1 px-4 py-4">
                <Typography.P className="text-lg font-bold line-clamp-2">
                  {anime.title}
                </Typography.P>
                <Typography.P className="text-sm text-muted-foreground">
                  Total Episodes: <span className="font-medium">{anime.current_episode}</span>
                </Typography.P>
                <Typography.P className="text-sm">
                  📅 {anime.release_day} — {anime.newest_release_date}
                </Typography.P>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {seeAllLink && (
        <CardFooter className="mt-4 flex justify-end">
          <Link href={`/${seeAllLink}/1`}>
            <Button
              variant="secondary"
              className="rounded-full px-6 py-2 shadow hover:shadow-md transition-all"
            >
              See all →
            </Button>
          </Link>
        </CardFooter>
      )}
    </>
  );
}
