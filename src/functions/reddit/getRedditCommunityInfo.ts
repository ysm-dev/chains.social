import { getRedditAccessToken } from "@/functions/reddit/getRedditAccessToken"
import { ofetch } from "@/lib/ofetch"
import { defaultBrowserHeaders } from "@/utils/defaultBrowserHeaders"
import { memoize } from "@fxts/core"
import { z } from "zod"

/*
  x-ratelimit-limit: 1000
  x-ratelimit-reset: 10 minutes
*/
export const getRedditCommunityInfo = memoize(async (communityName: string) => {
  const { access_token } = await getRedditAccessToken()

  const response = await ofetch<GetRedditCommunityInfoResponse>(
    `https://oauth.reddit.com/r/${communityName}/about`,
    {
      headers: {
        ...defaultBrowserHeaders,
        Authorization: `Bearer ${access_token}`,
      },
    },
  )

  return getRedditCommunityInfoSchema.parse(response)
})

const getRedditCommunityInfoSchema = z.object({
  kind: z.string(),
  data: z.object({
    subscribers: z.number(),
  }),
})

export type GetRedditCommunityInfoResponse = z.infer<
  typeof getRedditCommunityInfoSchema
>
