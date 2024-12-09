import { memoize } from "@fxts/core"
import { ofetch } from "ofetch"
import { z } from "zod"

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
      username: z.string(),
      followerCount: z.number(),
      followingCount: z.number(),
    }),
  }),
})

export type GetWarpcastUserInfoResponse = z.infer<
  typeof getWrapcasetUserInfoSchema
>
