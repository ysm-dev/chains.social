import { env } from "@/lib/env"
import { z } from "zod"

export const getRedditAccessToken = async () => {
  const token = Buffer.from(
    `${env.REDDIT_CLIENT_ID}:${env.REDDIT_CLIENT_SECRET}`,
  ).toString("base64")

  const response = await fetch(
    `https://www.reddit.com/api/v1/access_token?${new URLSearchParams({
      grant_type: "client_credentials",
    })}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${token}`,
        "User-Agent": "chains.social/1.0.0",
      },
    },
  ).then((res) => res.json())

  return getAccessTokenSchema.parse(response)
}

const getAccessTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
})
