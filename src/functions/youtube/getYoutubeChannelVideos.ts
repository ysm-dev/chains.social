import { env } from "@/lib/env"
import { memoize } from "@fxts/core"
import { z } from "zod"

export const getYoutubeChannelVideos = memoize(async (channelId: string) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?${new URLSearchParams({
      part: "snippet",
      channelId: channelId,
      order: "date",
      maxResults: "1",
      key: env.YOUTUBE_DATA_API_KEY,
    })}`,
  ).then((res) => res.json())

  return getYoutubeChannelVideoSchema.parse(response)
})

export const getYoutubeChannelVideoSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  nextPageToken: z.string(),
  regionCode: z.string(),
  pageInfo: z.object({
    totalResults: z.number(),
    resultsPerPage: z.number(),
  }),
  items: z
    .array(
      z.object({
        kind: z.string(),
        etag: z.string(),
        id: z.object({
          kind: z.string(),
          videoId: z.string(),
        }),
        snippet: z.object({
          publishedAt: z.string(),
          channelId: z.string(),
          title: z.string(),
          description: z.string(),
          thumbnails: z.object({
            default: z.object({
              url: z.string(),
              width: z.number(),
              height: z.number(),
            }),
            medium: z.object({
              url: z.string(),
              width: z.number(),
              height: z.number(),
            }),
            high: z.object({
              url: z.string(),
              width: z.number(),
              height: z.number(),
            }),
          }),
          channelTitle: z.string(),
          liveBroadcastContent: z.string(),
          publishTime: z.string(),
        }),
      }),
    )
    .min(1),
})

export type getYoutubeChannelVideoResponse = z.infer<
  typeof getYoutubeChannelVideoSchema
>
