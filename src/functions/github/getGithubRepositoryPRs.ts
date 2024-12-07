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

export const getGithubRepositoryPRs = memoize(
  async (organizationName: string, repositoryName: string) => {
    const prs = await pipe(
      range(Infinity),
      toAsync,
      map(async (page) =>
        fetch(
          `https://api.github.com/repos/${organizationName}/${repositoryName}/pulls?${new URLSearchParams(
            {
              per_page: "100",
              page: page.toString(),
              state: "all",
            },
          )}`,
        ).then((res) => res.json()),
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
