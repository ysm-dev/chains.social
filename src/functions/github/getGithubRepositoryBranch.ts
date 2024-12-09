import { memoize } from "@fxts/core"
import { ofetch } from "ofetch"
import { z } from "zod"

export const getGithubRepositoryBranch = memoize(
  async (
    organizationName: string,
    repositoryName: string,
    defaultBranch: string,
  ) => {
    const response = await ofetch<GetDiscordInviteBranchResponse>(
      `https://api.github.com/repos/${organizationName}/${repositoryName}/branches/${defaultBranch}`,
    )

    const data = getGithubRepositoryBranchSchema.parse(response)

    return {
      name: data.name,
      lastCommitDate: data.commit.commit.committer.date,
    }
  },
)

export const getGithubRepositoryBranchSchema = z.object({
  name: z.string(),
  commit: z.object({
    commit: z.object({
      committer: z.object({
        date: z.string(),
      }),
    }),
  }),
})

export type GetDiscordInviteBranchResponse = z.infer<
  typeof getGithubRepositoryBranchSchema
>
