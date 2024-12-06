import { memoize } from "@fxts/core"
import { z } from "zod"

export const getWarpcastUserCasts = memoize(async (fid: number) => {
  const response = await fetch(
    `https://client.warpcast.com/v2/casts?${new URLSearchParams({
      fid: fid.toString(),
      limit: "1",
    })}`,
  ).then((res) => res.json())

  return getWarpcastUserCastsSchema.parse(response)
})

const getWarpcastUserCastsSchema = z.object({
  result: z.object({
    casts: z.array(
      z.object({
        author: z.object({
          fid: z.number(),
        }),
        timestamp: z.number(),
      }),
    ),
  }),
})
