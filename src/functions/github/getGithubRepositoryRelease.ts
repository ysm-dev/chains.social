import { memoize } from "@fxts/core"
import { ofetch } from "ofetch"
import { z } from "zod"

/*
  x-ratelimit-limit: 5000
  x-reatelimit-rest: 1 hour
*/
export const getGithubRepositoryRelease = memoize(
  async (organizationName: string, repositoryName: string) => {
    const response = await ofetch<GetGithubRepositoryResponse>(
      `https://api.github.com/repos/${organizationName}/${repositoryName}/releases/latest`,
    )

    return getGithubRepositoryReleaseSchema.parse(response)
  },
)

export const getGithubRepositoryReleaseSchema = z.object({
  id: z.number(),
  name: z.string(),
  published_at: z.string(),
})

export type GetGithubRepositoryResponse = z.infer<
  typeof getGithubRepositoryReleaseSchema
>
