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
        <CardHeader className="text-center font-bold text-2xl text-gray-800 dark:text-gray-100">
          {animeHeader}
        </CardHeader>
        <SkeletonCard />
      </>
    );
  }

  return (
    <>
      <CardHeader className="text-center font-bold text-2xl text-gray-800 dark:text-gray-50 mb-2">
        {animeHeader}
      </CardHeader>

      <div className="mx-2 grid gap-4 max-[640px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        {animeData?.map((anime: OnGoingAnimeProps) => (
          <Link href={`/anime/${anime.slug}`} key={anime.slug}>
            <Card className="group relative flex flex-col rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl hover:shadow-purple-200 dark:hover:shadow-purple-900/30 transition-all duration-300 transform hover:scale-105 h-full">
              
              {/* Gambar Poster */}
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={anime.poster}
                  alt={anime.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Overlay saat hover */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm bg-black/50 px-3 py-1 rounded-full">
                    📺 Watch Now
                  </span>
                </div>
              </div>

              {/* Deskripsi */}
              <div className="flex-1 p-3 space-y-1.5">
                <Typography.P className="text-lg font-bold text-gray-800 dark:text-gray-50 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {anime.title}
                </Typography.P>

                <Typography.P className="flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400 font-medium">
                  🎬 Total {anime.current_episode} Episode
                </Typography.P>

                <Typography.P className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400">
                  📅 Rilis: {anime.release_day || "Tidak diketahui"}
                </Typography.P>

                <Typography.P className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 italic">
                  ⏳ Terakhir: {anime.newest_release_date}
                </Typography.P>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Tombol "See All" */}
      {seeAllLink && (
        <CardFooter className="mt-6 flex justify-end">
          <Button
            variant={"secondary"}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Link href={`/${seeAllLink}/1`} className="flex items-center gap-1">
              🔍 See All
            </Link>
          </Button>
        </CardFooter>
      )}
    </>
  );
}
