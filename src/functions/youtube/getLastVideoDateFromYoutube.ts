import { env } from "@/lib/env"
import { ofetch } from "@/lib/ofetch"
import { getLastSegment } from "@/utils/getLastSegment"
import { z } from "zod"

export const getLastVideoDateFromYoutube = async (youtubeLink: string) => {
  const channelId = getLastSegment(youtubeLink)

  const response = await ofetch<GetLastVideoDateFromYoutubeResponse>(
    `https://www.googleapis.com/youtube/v3/search`,
    {
      query: {
        part: "snippet",
        channelId: channelId,
        order: "date",
        maxResults: 1,
        key: env.YOUTUBE_DATA_API_KEY,
      },
    },
  )

  const data = getLastVideoDateFromYoutubeSchema.parse(response)

  const { publishedAt } = data.items[0].snippet

  return new Date(publishedAt).toISOString()
}

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
