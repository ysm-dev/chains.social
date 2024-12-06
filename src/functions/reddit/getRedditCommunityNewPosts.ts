import { getRedditAccessToken } from "@/functions/reddit/getRedditAccessToken"
import { memoize } from "@fxts/core"
import { z } from "zod"

export const getRedditCommunityNewPosts = memoize(
  async (communityName: string) => {
    const { access_token } = await getRedditAccessToken()

    const response = await fetch(
      `https://oauth.reddit.com/r/${communityName}/new?${new URLSearchParams({
        limit: "1",
      })}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "User-Agent": "chains.social/1.0.0",
        },
      },
    ).then((res) => res.json())

    return getRedditCommunityNewSchema.parse(response)
  },
)

const getRedditCommunityNewSchema = z.object({
  kind: z.string(),
  data: z.object({
    children: z
      .array(
        z.object({
          kind: z.string(),
          data: z.object({
            created_utc: z.number(),
          }),
        }),
      )
      .min(1),
  }),
})
