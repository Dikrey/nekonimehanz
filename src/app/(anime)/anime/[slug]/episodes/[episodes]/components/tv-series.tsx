import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import Typography from "@/components/ui/typography";

export default function TVSeries({
  dataAnime,
  dataEpisode,
  episodeNum,
  handleAnimeEpisode,
  provider,
  router,
  setProvider,
  updateEpisode,
}: Readonly<{
  dataAnime: any;
  dataEpisode: any;
  episodeNum: any;
  handleAnimeEpisode: any;
  provider: string;
  router: any;
  setProvider: any;
  updateEpisode: any;
}>) {
  if (dataEpisode?.data === undefined) return notFound();

  return (
    <Card className="overflow-hidden rounded-2xl border border-border/50 bg-card/70 shadow-xl backdrop-blur-sm dark:border-gray-800">
      {/* Header */}
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-foreground">
          {dataEpisode?.data?.episode}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Video Player */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-md">
          <iframe
            title="anime-episode"
            className="h-full w-full rounded-xl border-0"
            src={provider === "" ? `${dataEpisode?.data?.stream_url}` : provider}
            allowFullScreen
            loading="lazy"
          />
        </div>

        {/* Controls: Previous, Episode Select, Provider, Next */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 md:gap-4">
          {/* Previous Button */}
          <div className="flex">
            {dataEpisode?.data?.has_previous_episode ? (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant="secondary"
                    className="group w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                    onClick={() =>
                      updateEpisode(
                        `/anime/${router.slug}/episodes/${episodeNum! - 1}`,
                        router.slug
                      )
                    }
                  >
                    <Link href={`${episodeNum! - 1}`} className="flex items-center gap-2">
                      ← <span className="font-medium">Previous</span>
                    </Link>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="text-center text-sm">
                  Back to previous episode
                </HoverCardContent>
              </HoverCard>
            ) : (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant="outline"
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border-gray-300 text-gray-400 opacity-60 dark:border-gray-700"
                  >
                    ← Previous
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="text-center text-sm">
                  This is the first episode.
                </HoverCardContent>
              </HoverCard>
            )}
          </div>

          {/* Episode Select */}
          <div>
            <Select
              value={episodeNum?.toString()}
              onValueChange={(value: string) => handleAnimeEpisode(Number(value))}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Episode" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>All Episodes</SelectLabel>
                  {dataAnime?.data?.episode_lists.map((episode: any, index: number) => (
                    <Link key={episode.slug} href={`/anime/${router.slug}/episodes/${index + 1}`}>
                      <SelectItem value={`${index + 1}`}>
                        Episode {index + 1}
                      </SelectItem>
                    </Link>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Provider Select */}
          <div>
            <Select onValueChange={(value: string) => setProvider(value)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Media Provider</SelectLabel>
                  {dataEpisode?.data?.download_urls.mp4?.flatMap((resolution: any) =>
                    resolution.urls.map((url: any) => (
                      <SelectItem
                        key={`${resolution.resolution}-${url.provider}`}
                        value={url.url}
                      >
                        {resolution.resolution} - {url.provider}
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Next Button */}
          <div className="flex">
            {dataEpisode?.data?.has_next_episode ? (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant="secondary"
                    className="group w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
                    onClick={() =>
                      updateEpisode(
                        `/anime/${router.slug}/episodes/${episodeNum! + 1}`,
                        router.slug
                      )
                    }
                  >
                    <Link href={`${episodeNum! + 1}`} className="flex items-center gap-2">
                      <span className="font-medium">Next</span> →
                    </Link>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="text-center text-sm">
                  Go to next episode
                </HoverCardContent>
              </HoverCard>
            ) : (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant="outline"
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border-gray-300 text-gray-400 opacity-60 dark:border-gray-700"
                  >
                    Next →
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="text-center text-sm">
                  This is the latest episode.
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        </div>

        {/* Download Sections */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {/* MP4 Downloads */}
          <div className="rounded-xl border border-border/40 bg-muted/30 p-5 shadow-sm">
            <Typography.P className="text-lg font-semibold text-foreground">
              📥 Download .mp4
            </Typography.P>
            <ul className="mt-4 space-y-3">
              {dataEpisode?.data?.download_urls.mp4?.map((resolution: any) => (
                <li key={resolution.resolution} className="space-y-2">
                  <Typography.P className="font-medium text-foreground/80">
                    {resolution.resolution}
                  </Typography.P>
                  <div className="flex flex-wrap gap-2">
                    {resolution.urls.map((url: any) => (
                      <Link key={url.provider} href={url.url} target="_blank">
                        <Button
                          variant="outline"
                          className="rounded-full bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 hover:from-purple-100 hover:to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30"
                        >
                          {url.provider}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* MKV Downloads */}
          <div className="rounded-xl border border-border/40 bg-muted/30 p-5 shadow-sm">
            <Typography.P className="text-lg font-semibold text-foreground">
              📦 Download .mkv
            </Typography.P>
            <ul className="mt-4 space-y-3">
              {dataEpisode?.data?.download_urls.mkv?.map((resolution: any) => (
                <li key={resolution.resolution} className="space-y-2">
                  <Typography.P className="font-medium text-foreground/80">
                    {resolution.resolution}
                  </Typography.P>
                  <div className="flex flex-wrap gap-2">
                    {resolution.urls.map((url: any) => (
                      <Link key={url.provider} href={url.url} target="_blank">
                        <Button
                          variant="outline"
                          className="rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 hover:from-blue-100 hover:to-cyan-100 dark:from-blue-950/30 dark:to-cyan-950/30"
                        >
                          {url.provider}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
