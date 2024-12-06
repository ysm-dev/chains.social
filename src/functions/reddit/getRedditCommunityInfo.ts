import { z } from "zod"

export const getRedditCommunityInfo = async (
  accessToken: string,
  communityName: string,
) => {
  const response = await fetch(
    `https://oauth.reddit.com/r/${communityName}/about`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "chains.social/1.0.0",
      },
    },
  ).then((res) => res.json())

  return getRedditCommunityInfoSchema.parse(response)
}

const getRedditCommunityInfoSchema = z.object({
  kind: z.string(),
  data: z.object({
    subscribers: z.number(),
  }),
})
