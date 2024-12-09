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

export const getGithubRepositoryIssues = memoize(
  async (organizationName: string, repositoryName: string) => {
    const issues = await pipe(
      range(Infinity),
      toAsync,
      map(async (page) =>
        ofetch<GetGithubIssuesResponse>(
          `https://api.github.com/repos/${organizationName}/${repositoryName}/issues`,
          {
            query: {
              per_page: "100",
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
      totalIssueCount: issues.length,
      openIssueCount: issues.filter((v) => v.state === "open").length,
      closedIssueCount: issues.filter((v) => v.state === "closed").length,
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
