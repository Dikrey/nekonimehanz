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
        <CardHeader className="text-center font-bold text-3xl tracking-wide">
          {animeHeader}
        </CardHeader>
        <SkeletonCard />
      </>
    );
  }

  return (
    <>
      <CardHeader className="text-center font-extrabold text-3xl tracking-wide text-primary">
        {animeHeader}
      </CardHeader>

      <div className="mx-2 grid gap-5 max-[640px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        {animeData?.map((anime: OnGoingAnimeProps) => (
          <Link href={`/anime/${anime.slug}`} key={anime.slug}>
            <Card className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-card/40 to-card/80 border border-border backdrop-blur-lg shadow-md hover:shadow-xl transition-all duration-500 h-full">
              {/* Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={anime.poster}
                  alt={anime.title}
                  className="object-cover w-full h-48 sm:h-72 md:h-72 lg:h-72 xl:h-96 rounded-t-xl transition-transform duration-500 group-hover:scale-110"
                  width={1000}
                  height={1000}
                />
                {/* Overlay info saat hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                  <Typography.P className="text-lg font-bold text-white line-clamp-2">
                    {anime.title}
                  </Typography.P>
                  <Typography.P className="text-sm text-gray-200">
                    {anime.current_episode} Episodes
                  </Typography.P>
                  <Typography.P className="text-sm text-gray-300">
                    📅 {anime.release_day} — {anime.newest_release_date}
                  </Typography.P>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {seeAllLink && (
        <CardFooter className="mt-6 flex justify-center">
          <Link href={`/${seeAllLink}/1`}>
            <Button
              className="rounded-full px-6 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              See all →
            </Button>
          </Link>
        </CardFooter>
      )}
    </>
  );
}
