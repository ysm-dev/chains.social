import { getRedditAccessToken } from "@/functions/reddit/getRedditAccessToken"
import { memoize } from "@fxts/core"
import { z } from "zod"

export const getRedditCommunityInfo = memoize(async (communityName: string) => {
  const { access_token } = await getRedditAccessToken()

  const response = await fetch(
    `https://oauth.reddit.com/r/${communityName}/about`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "User-Agent": "chains.social/1.0.0",
      },
    },
  ).then((res) => res.json())

  return getRedditCommunityInfoSchema.parse(response)
})

const getRedditCommunityInfoSchema = z.object({
  kind: z.string(),
  data: z.object({
    subscribers: z.number(),
  }),
})
