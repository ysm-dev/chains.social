import { memoize } from "@fxts/core"
import { z } from "zod"

export const getWarpcastChannelCasts = memoize(async (channelName: string) => {
  const response = await fetch(`https://client.warpcast.com/v2/feed-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      feedKey: channelName,
      feedType: "default",
      castViewEvents: [],
      updateState: true,
    }),
  }).then((res) => res.json())

  return getWarpcastChannelCastsSchema.parse(response)
})

const getWarpcastChannelCastsSchema = z.object({
  result: z.object({
    feedTopSeenAtTimestamp: z.number(),
  }),
})
