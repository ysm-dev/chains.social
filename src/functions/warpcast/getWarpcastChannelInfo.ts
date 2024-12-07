import { memoize } from "@fxts/core"
import { z } from "zod"

export const getWarpcastChannelInfo = memoize(async (channelName: string) => {
  const response = await fetch(
    `https://client.warpcast.com/v1/channel-details?key=${channelName}`,
  ).then((res) => res.json())

  return getWarpcastChannelInfoSchema.parse(response)
})

const getWarpcastChannelInfoSchema = z.object({
  result: z.object({
    details: z.object({
      lead: z.object({
        fid: z.number(),
        followerCount: z.number(),
        followingCount: z.number(),
      }),
    }),
  }),
})
