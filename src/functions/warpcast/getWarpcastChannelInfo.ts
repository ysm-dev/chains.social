import { ofetch } from "@/lib/ofetch"
import { memoize } from "@fxts/core"
import { z } from "zod"

/*
  x-ratelimit-limit: none
  x-ratelimit-rest: none
*/
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
