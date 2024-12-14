import { ofetch } from "@/lib/ofetch"
import { memoize } from "@fxts/core"
import { z } from "zod"

export const getGithubIssueCount = memoize(
  async (repositoryName: string, organizationName: string) => {
    const response = await ofetch<{
      total_count: number
    }>(`https://github.com/_graphql`, {
      query: {
        body: {
          query: "29746fd23262d23f528e1f5b9b427437",
          variables: {
            repo: `${organizationName}/${repositoryName}`,
            query: "is:issue",
            name: repositoryName,
            owner: organizationName,
          },
        },
      },
    })

    const { data } = getTotalIssueCountFromGithubSchema.parse(response)

    return {
      openIssueCount: data.repository.search.openIssueCount ?? 0,
      closedIssueCount: data.repository.search.closedIssueCount ?? 0,
    }
  },
)

const getTotalIssueCountFromGithubSchema = z.object({
  data: z.object({
    repository: z.object({
      search: z.object({
        closedIssueCount: z.number().nullable(),
        openIssueCount: z.number().nullable(),
      }),
      id: z.string(),
    }),
  }),
})
