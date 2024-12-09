import { getRedditAccessToken } from "@/functions/reddit/getRedditAccessToken"
import { memoize } from "@fxts/core"
import { ofetch } from "ofetch"
import { z } from "zod"

export const getRedditCommunityNewPosts = memoize(
  async (communityName: string) => {
    const { access_token } = await getRedditAccessToken()

    const response = await ofetch<GetRedditCommunityNewResponse>(
      `https://oauth.reddit.com/r/${communityName}/new`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "User-Agent": "chains.social/1.0.0",
        },
        query: {
          limit: "1",
        },
      },
    )

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

export type GetRedditCommunityNewResponse = z.infer<
  typeof getRedditCommunityNewSchema
>
