import { memoize } from "@fxts/core"
import { z } from "zod"

export const getGithubOrganizationInfo = memoize(
  async (organizationName: string) => {
    const res = await fetch(`https://api.github.com/orgs/${organizationName}`)
    const result: GetDiscordInviteInfoResponse = await res.json()

    return getGithubOrganizationInfoSchema.parse(result)
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
