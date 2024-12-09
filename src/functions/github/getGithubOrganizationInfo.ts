import { memoize } from "@fxts/core"
import { ofetch } from "ofetch"
import { z } from "zod"

export const getGithubOrganizationInfo = memoize(
  async (organizationName: string) => {
    const response = await ofetch<GetDiscordInviteInfoResponse>(
      `https://api.github.com/orgs/${organizationName}`,
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
