import { memoize } from "@fxts/core"
import { z } from "zod"

async function* fetchAllGithubIssues(
  organizationName: string,
  repositoryName: string,
) {
  let page = 1
  const limit = 100

  while (true) {
    const response = await fetch(
      `https://api.github.com/repos/${organizationName}/${repositoryName}/issues?${new URLSearchParams(
        {
          per_page: limit.toString(),
          page: page.toString(),
          state: "all",
        },
      )}`,
    ).then((res) => res.json())

    yield getGithubIssuesSchema.parse(response)

    if (response.length < limit) {
      break
    }

    page++
  }
}

export const getGithubRepositoryIssues = memoize(
  async (organizationName: string, repositoryName: string) => {
    let issues: GetGithubIssuesResponse = []

    for await (const pageData of fetchAllGithubIssues(
      organizationName,
      repositoryName,
    )) {
      issues.push(...pageData)
    }

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
