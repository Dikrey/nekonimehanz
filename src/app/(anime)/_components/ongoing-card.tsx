import { OnGoingAnimeProps } from "@/types/ongoing-anime";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import SkeletonCard from "@/components/layout/skeleton-card";
import Typography from "@/components/ui/typography";
import "./rgb-border.css"; // kita akan bikin animasi RGB di sini

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
        <CardHeader className="text-center font-bold">{animeHeader}</CardHeader>
        <SkeletonCard />
      </>
    );
  }

  return (
    <>
      <CardHeader className="text-center font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse">
        {animeHeader}
      </CardHeader>

      <div className="mx-2 grid gap-4 max-[640px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        {animeData?.map((anime: OnGoingAnimeProps) => (
          <Link href={`/anime/${anime.slug}`} key={anime.slug}>
            <Card className="rgb-border rounded-xl overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl shadow-lg bg-background">
              <Image
                src={anime.poster}
                alt={anime.title}
                className="rounded-t-lg object-cover max-[640px]:h-36 sm:h-80 md:h-72 lg:h-72 xl:h-96 w-full"
                width={1000}
                height={1000}
              />
              <div className="mt-4 flex-1 space-y-2 px-4 pb-4">
                <Typography.P className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
                  {anime.title}
                </Typography.P>
                <Typography.P className="pt-2 text-sm">
                  📺 <span className="font-semibold">Total Episode:</span> {anime.current_episode}
                </Typography.P>
                <Typography.P className="text-sm">
                  📅 <span className="font-semibold">Release Day:</span> {anime.release_day}
                </Typography.P>
                <Typography.P className="text-sm">
                  ⏳ <span className="font-semibold">Release Date:</span> {anime.newest_release_date}
                </Typography.P>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {seeAllLink && (
        <CardFooter className="mt-4 flex justify-end">
          <Button
            variant={"secondary"}
            className="hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl"
          >
            <Link href={`/${seeAllLink}/1`}>🔍 See all</Link>
          </Button>
        </CardFooter>
      )}
    </>
  );
}
