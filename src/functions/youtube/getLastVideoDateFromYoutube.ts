import { env } from "@/lib/env"
import { ofetch } from "@/lib/ofetch"
import { z } from "zod"

export const getLastVideoDateFromYoutube = async (youtubeChannelId: string) => {
  const response = await ofetch<getYoutubeChannelVideoResponse>(
    `https://api.subscribercounter.com/video/all/${youtubeChannelId}`,
    {
      headers: {
        authorization: `Basic ${env.COUNT_API_KEY}`,
        origin: "https://subscribercounter.com",
      },
    },
  )

  console.log(JSON.stringify(response, null, 2))

  const { data } = getYoutubeChannelVideoSchema.parse(response)

  const { publishedAt } = data.items[0].snippet

  return new Date(publishedAt).toISOString()
}

export const getYoutubeChannelVideoSchema = z.object({
  success: z.boolean(),
  data: z.object({
    items: z
      .array(
        z.object({
          snippet: z.object({
            publishedAt: z.string(),
          }),
        }),
      )
      .min(1),
  }),
})

export type getYoutubeChannelVideoResponse = z.infer<
  typeof getYoutubeChannelVideoSchema
>
