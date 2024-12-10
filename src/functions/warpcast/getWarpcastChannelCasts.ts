import { memoize } from "@fxts/core"
import { ofetch } from "ofetch"
import { z } from "zod"

/*
  x-ratelimit-limit: none
  x-ratelimit-rest: none
*/
export const getWarpcastChannelCasts = memoize(async (channelName: string) => {
  const response = await ofetch<GetWarpcastChannelCastsResponse>(
    `https://client.warpcast.com/v2/feed-items`,
    {
      method: "POST",
      body: {
        feedKey: channelName,
        feedType: "default",
        castViewEvents: [],
        updateState: true,
      },
    },
  )

  return getWarpcastChannelCastsSchema.parse(response)
})

const getWarpcastChannelCastsSchema = z.object({
  result: z.object({
    feedTopSeenAtTimestamp: z.number(),
  }),
})

export type GetWarpcastChannelCastsResponse = z.infer<
  typeof getWarpcastChannelCastsSchema
>
