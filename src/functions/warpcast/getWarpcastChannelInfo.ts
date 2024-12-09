import { memoize } from "@fxts/core"
import { ofetch } from "ofetch"
import { z } from "zod"

export const getWarpcastChannelInfo = memoize(async (channelName: string) => {
  const response = await ofetch<GetWarpcastChannelInfoResponse>(
    `https://client.warpcast.com/v1/channel-details?key=${channelName}`,
  )

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

export type GetWarpcastChannelInfoResponse = z.infer<
  typeof getWarpcastChannelInfoSchema
>
