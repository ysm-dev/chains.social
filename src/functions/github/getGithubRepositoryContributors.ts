import {
  flat,
  map,
  memoize,
  pipe,
  range,
  takeUntil,
  toArray,
  toAsync,
} from "@fxts/core"
import { z } from "zod"

export const getGithubRepositoryContributors = memoize(
  async (organizationName: string, repositoryName: string) => {
    const contributors = await pipe(
      range(Infinity),
      toAsync,
      map(async (page) =>
        fetch(
          `https://api.github.com/repos/${organizationName}/${repositoryName}/contributors?${new URLSearchParams(
            {
              per_page: "100",
              page: page.toString(),
              anon: "true",
            },
          )}`,
        ).then((res) => res.json()),
      ),
      map((v) => getGithubRepositoryContributorsSchema.parse(v)),
      takeUntil((v) => v.length < 100),
      flat,
      toArray,
    )

    const commitCount = contributors.reduce(
      (acc, contributor) => acc + contributor.contributions,
      0,
    )

    const userCommitCount = contributors
      .filter((v) => v.type === "User")
      .reduce((acc, contributor) => acc + contributor.contributions, 0)

    return {
      commitByUserCount: userCommitCount,
      commitByBotCount: commitCount - userCommitCount,
      contributorCount: contributors.length,
    }
  },
)

export const getGithubRepositoryContributorsSchema = z.array(
  z.object({
    login: z.string().optional(),
    type: z.string().optional(),
    contributions: z.number(),
  }),
)

export type GetGithubRepositoryContributorsResponse = z.infer<
  typeof getGithubRepositoryContributorsSchema
>
