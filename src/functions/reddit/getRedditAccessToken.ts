import { REDDIT_CLIENT_ID, env } from "@/lib/env"
import { ofetch } from "@/lib/ofetch"
import { memoize } from "@fxts/core"
import { z } from "zod"

/*
  x-ratelimit-limit: none
  x-ratelimit-rest: none
*/
export const getRedditAccessToken = memoize(async () => {
  const token = Buffer.from(
    `${REDDIT_CLIENT_ID}:${env.REDDIT_CLIENT_SECRET}`,
  ).toString("base64")

  const response = await ofetch<GetAccessTokenResponse>(
    `https://www.reddit.com/api/v1/access_token`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${token}`,
        "User-Agent": "chains.social/1.0.0",
      },
      query: {
        grant_type: "client_credentials",
      },
    },
  )

  return getAccessTokenSchema.parse(response)
})

const getAccessTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
})

export type GetAccessTokenResponse = z.infer<typeof getAccessTokenSchema>
