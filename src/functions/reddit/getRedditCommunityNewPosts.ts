import { getRedditAccessToken } from "@/functions/reddit/getRedditAccessToken"
import { ofetch } from "@/lib/ofetch"
import { defaultBrowserHeaders } from "@/utils/defaultBrowserHeaders"
import { memoize } from "@fxts/core"
import { z } from "zod"

/*
  x-ratelimit-limit: 1000
  x-ratelimit-rest: 354 seconds
*/
export const getRedditCommunityNewPosts = memoize(
  async (communityName: string) => {
    const { access_token } = await getRedditAccessToken()

    const response = await ofetch<GetRedditCommunityNewResponse>(
      `https://oauth.reddit.com/r/${communityName}/new`,
      {
        headers: {
          ...defaultBrowserHeaders,
          Authorization: `Bearer ${access_token}`,
        },
        query: {
          limit: 1,
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
