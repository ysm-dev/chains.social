import { env } from "@/lib/env"
import { ofetch } from "@/lib/ofetch"
import { getLastSegment } from "@/utils/getLastSegment"
import { memoize } from "@fxts/core"
import { z } from "zod"

export const getYoutubeChannelId = memoize(async (youtubeUrl: string) => {
  const query = getLastSegment(youtubeUrl).replace("@", "")

  const response = await ofetch<GetYoutubeChannelIdResponse>(
    `https://www.googleapis.com/youtube/v3/search`,
    {
      query: {
        type: `channel`,
        part: `snippet`,
        q: query,
        maxResults: 1,
        key: env.YOUTUBE_DATA_API_KEY,
      },
    },
  )

  const data = getYoutubeChannelIdSchema.parse(response)

  return data.items[0].id.channelId
})

const getYoutubeChannelIdSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  items: z
    .array(
      z.object({
        kind: z.string(),
        etag: z.string(),
        id: z.object({
          kind: z.string(),
          channelId: z.string(),
        }),
      }),
    )
    .min(1),
})

export type GetYoutubeChannelIdResponse = z.infer<
  typeof getYoutubeChannelIdSchema
>
