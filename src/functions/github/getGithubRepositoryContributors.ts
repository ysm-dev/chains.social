import { memoize } from "@fxts/core"
import { z } from "zod"

async function* fetchAllGithubRepositoryContributors(
  organizationName: string,
  repositoryName: string,
) {
  let page = 1
  const limit = 100

  while (true) {
    const response = await fetch(
      ` https://api.github.com/repos/${organizationName}/${repositoryName}/contributors?${new URLSearchParams(
        {
          per_page: limit.toString(),
          page: page.toString(),
          anon: "true",
        },
      )}`,
    ).then((res) => res.json())

    yield getGithubRepositoryContributorsSchema.parse(response)

    if (response.length < limit) {
      break
    }

    page++
  }
}

export const getGithubRepositoryContributors = memoize(
  async (organizationName: string, repositoryName: string) => {
    let contributors: GetGithubRepositoryContributorsResponse = []

    for await (const pageData of fetchAllGithubRepositoryContributors(
      organizationName,
      repositoryName,
    )) {
      contributors.push(...pageData)
    }

    const contributorCount = contributors.length

    const commitCount = contributors.reduce(
      (acc, contributor) => acc + contributor.contributions,
      0,
    )

    return { commitCount, contributorCount }
  },
)

export const getGithubRepositoryContributorsSchema = z.array(
  z.object({
    login: z.string().optional(),
    contributions: z.number(),
  }),
)

export type GetGithubRepositoryContributorsResponse = z.infer<
  typeof getGithubRepositoryContributorsSchema
>
