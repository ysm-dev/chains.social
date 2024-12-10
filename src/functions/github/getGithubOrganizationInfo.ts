import { env } from "@/lib/env"
import { memoize } from "@fxts/core"
import { ofetch } from "ofetch"
import type { aC } from "vitest/dist/chunks/reporters.D7Jzd9GS.js"
import { z } from "zod"

/*
  x-ratelimit-limit: 5000
  x-ratelimit-rest: 1 hour
*/
export const getGithubOrganizationInfo = memoize(
  async (organizationName: string) => {
    const response = await ofetch<GetDiscordInviteInfoResponse>(
      `https://api.github.com/orgs/${organizationName}`,
      {
        headers: {
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        },
      },
    )

    return getGithubOrganizationInfoSchema.parse(response)
  },
)

export const getGithubOrganizationInfoSchema = z.object({
  login: z.string(),
  name: z.string(),
  public_repos: z.number(),
  followers: z.number(),
  type: z.string(),
})

export type GetDiscordInviteInfoResponse = z.infer<
  typeof getGithubOrganizationInfoSchema
>
