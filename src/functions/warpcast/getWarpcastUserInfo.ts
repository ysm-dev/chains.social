import { memoize } from "@fxts/core"
import { z } from "zod"

export const getWarpcastUserInfo = memoize(async (userName: string) => {
  const response = await fetch(
    `https://client.warpcast.com/v2/user-by-username?username=${userName}`,
  ).then((res) => res.json())

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
