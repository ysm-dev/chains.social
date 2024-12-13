import { env } from "@/lib/env"
import { memoize } from "@fxts/core"
import { ofetch } from "ofetch"
import { z } from "zod"

/*
  x-ratelimit-limit: none
  x-ratelimit-rest: none
*/
export const getYoutubeChannelInfo = memoize(async (channelId: string) => {
  const response = await ofetch<getYoutubeChannelInfoResponse>(
    `https://api.subcount.app/channel/info/${channelId}`,
    {
      headers: {
        authorization: `Basic ${env.COUNT_API_KEY}`,
        origin: "https://subscribercounter.com",
      },
    },
  )

  const { data } = getYoutubeChannelInfoSchema.parse(response)

  const channelData = data.items.find((v) => v.id === channelId)
  if (!channelData) {
    throw new Error("Channel not found")
  }

  return channelData
})

export const getYoutubeChannelInfoSchema = z.object({
  success: z.boolean(),
  data: z.object({
    items: z
      .array(
        z.object({
          kind: z.string(),
          etag: z.string(),
          id: z.string(),
          statistics: z.object({
            viewCount: z.string(),
            subscriberCount: z.string(),
            hiddenSubscriberCount: z.boolean(),
            videoCount: z.string(),
          }),
        }),
      )
      .min(1),
  }),
})

export type getYoutubeChannelInfoResponse = z.infer<
  typeof getYoutubeChannelInfoSchema
>
