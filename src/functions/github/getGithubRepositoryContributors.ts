import { env } from "@/lib/env"
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
import { ofetch } from "ofetch"
import { z } from "zod"

/*
  x-ratelimit-limit: 5000
  x-ratelimit-rest: 1 hour
*/
export const getGithubRepositoryContributors = memoize(
  async (organizationName: string, repositoryName: string) => {
    const contributors = await pipe(
      range(Infinity),
      toAsync,
      map(async (page) =>
        ofetch<GetGithubRepositoryContributorsResponse>(
          `https://api.github.com/repos/${organizationName}/${repositoryName}/contributors`,
          {
            query: {
              per_page: 100,
              page,
              anon: true,
            },
            headers: {
              Authorization: `Bearer ${env.GITHUBPAT_TOKEN}`,
            },
          },
        ),
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
