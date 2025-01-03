import { env } from "@/lib/env"
import { ofetch } from "@/lib/ofetch"
import { memoize } from "@fxts/core"
import { z } from "zod"

/*
  x-ratelimit-limit: 5000
  x-ratelimit-rest: 1 hour
*/
export const getGithubRepositoryInfo = memoize(
  async (organizationName: string, repositoryName: string) => {
    const response = await ofetch<GetDiscordInviteInfoResponse>(
      `https://api.github.com/repos/${organizationName}/${repositoryName}`,
      {
        headers: {
          Authorization: `Bearer ${env.GITHUBPAT_TOKEN}`,
        },
      },
    )

    return getGithubOrganizationInfoSchema.parse(response)
  },
)

export const getGithubOrganizationInfoSchema = z.object({
  name: z.string(),
  full_name: z.string(),
  watchers_count: z.number(),
  forks_count: z.number(),
  subscribers_count: z.number(),
  open_issues_count: z.number(),
  default_branch: z.string(),
})

export type GetDiscordInviteInfoResponse = z.infer<
  typeof getGithubOrganizationInfoSchema
>
