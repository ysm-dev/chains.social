import { env } from "@/lib/env"
import { ofetch } from "@/lib/ofetch"
import { memoize } from "@fxts/core"
import { z } from "zod"

export const getLastVideoDateFromYoutube = memoize(
  async (youtubeChannelId: string) => {
    const playlistId = `${youtubeChannelId.slice(0, 1)}U${youtubeChannelId.slice(2)}`

    const response = await ofetch<GetLastVideoDateFromYoutubeResponse>(
      `https://www.googleapis.com/youtube/v3/playlistItems`,
      {
        query: {
          part: "snippet",
          playlistId,
          maxResults: 1,
          key: env.YOUTUBE_DATA_API_KEY,
        },
      },
    )

    const data = getLastVideoDateFromYoutubeSchema.parse(response)

    const { publishedAt } = data.items[0].snippet

    return new Date(publishedAt).toISOString()
  },
)

const getLastVideoDateFromYoutubeSchema = z.object({
  items: z
    .array(
      z.object({
        snippet: z.object({
          publishedAt: z.string(),
        }),
      }),
    )
    .min(1),
})

export type GetLastVideoDateFromYoutubeResponse = z.infer<
  typeof getLastVideoDateFromYoutubeSchema
>
