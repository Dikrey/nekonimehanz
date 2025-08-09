import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { useEffect, useState } from "react";

interface RecommendationsProps {
  title: string;
  slug: string;
  poster: string;
  otakudesu_url: string;
}

export default function AnimeRecommendations({
  recommendations,
}: Readonly<{ recommendations: RecommendationsProps[] }>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!recommendations || recommendations.length === 0) return null;

  return (
    <section className="mt-8">
      {/* Header */}
      <Typography.P className="text-left text-xl font-bold text-foreground">
        🔔 You Might Also Like
      </Typography.P>

      {/* Grid */}
      <div className="mt-4 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {recommendations.map((recommendation, index) => (
          <Link
            href={`/anime/${recommendation.slug}`}
            key={recommendation.slug}
            className={`group block transform rounded-xl border border-border/40 bg-card/60 shadow-sm backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-xl dark:border-gray-800 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            {/* Poster */}
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-t-xl">
              <Image
                src={recommendation.poster}
                alt={recommendation.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                quality={85}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>

            {/* Title */}
            <div className="p-3 text-center">
              <Typography.P className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400">
                {recommendation.title}
              </Typography.P>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
