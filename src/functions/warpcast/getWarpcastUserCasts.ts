import { ofetch } from "@/lib/ofetch"
import { memoize } from "@fxts/core"
import { z } from "zod"

/*
  x-ratelimit-limit: none
  x-ratelimit-rest: none
*/
export const getWarpcastUserCasts = memoize(async (fid: number) => {
  const response = await ofetch<GetWarpcastUserCastsResponse>(
    `https://client.warpcast.com/v2/casts`,
    {
      query: {
        fid,
        limit: 1,
      },
    },
  )

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

export type GetWarpcastUserCastsResponse = z.infer<
  typeof getWarpcastUserCastsSchema
>
