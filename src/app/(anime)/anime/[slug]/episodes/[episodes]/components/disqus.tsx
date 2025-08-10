"use client";

import { DiscussionEmbed } from "disqus-react";

const DisqusComments = ({ post }: { post: any }) => {
  const disqusShortname = "otakudesu-4";
  const disqusConfig = {
    url:
      "https://nekonimehanz.vercel.app/anime" +
      post.slug +
      "/episodes/" +
      post.episodes,
    identifier: post.slug,
    title: post.title,
    language: "id_ID",
    sso: {
      name: "nekonimehanz",
      icon: "https://nekonimehanz.vercel.app/favicon.ico",
      url: "https://nekonimehanz.vercel.app",
      width: "500",
      height: "400",
    },
  };

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-2 bg-white text-muted/20 dark:bg-muted/20 dark:text-muted/80">
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </div>
    </div>
  );
};
export default DisqusComments;
