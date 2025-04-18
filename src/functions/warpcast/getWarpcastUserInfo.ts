import { ofetch } from "@/lib/ofetch"
import { memoize } from "@fxts/core"
import { z } from "zod"

/*
  x-ratelimit-limit: none
  x-ratelimit-rest: none
*/
export const getWarpcastUserInfo = memoize(async (userName: string) => {
  const response = await ofetch<GetWarpcastUserInfoResponse>(
    `https://client.warpcast.com/v2/user-by-username`,
    {
      query: {
        username: userName,
      },
    },
  )

  return getWrapcasetUserInfoSchema.parse(response)
})

const getWrapcasetUserInfoSchema = z.object({
  result: z.object({
    user: z.object({
      fid: z.number(),
      followerCount: z.number(),
      followingCount: z.number(),
    }),
  }),
})

export type GetWarpcastUserInfoResponse = z.infer<
  typeof getWrapcasetUserInfoSchema
>
