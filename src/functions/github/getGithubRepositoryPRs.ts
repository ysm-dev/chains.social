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
export const getGithubRepositoryPRs = memoize(
  async (organizationName: string, repositoryName: string) => {
    const prs = await pipe(
      range(Infinity),
      toAsync,
      map(async (page) =>
        ofetch<GetGithubIssuesResponse>(
          `https://api.github.com/repos/${organizationName}/${repositoryName}/pulls`,
          {
            query: {
              per_page: 100,
              page,
              state: "all",
            },
          },
        ),
      ),
      map((v) => getGithubIssuesSchema.parse(v)),
      takeUntil((v) => v.length < 100),
      flat,
      toArray,
    )

    return {
      totalPRCount: prs.length,
      openPRCount: prs.filter((v) => v.state === "open").length,
      closedPRCount: prs.filter((v) => v.state === "closed").length,
    }
  },
)

export const getGithubIssuesSchema = z.array(
  z.object({
    id: z.number(),
    state: z.string(),
  }),
)

export type GetGithubIssuesResponse = z.infer<typeof getGithubIssuesSchema>
