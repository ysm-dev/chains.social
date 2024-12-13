import { env } from "@/lib/env"
import { ofetch } from "ofetch"

export const getTotalIssueCountFromGithub = async (
  githubRepositoryLink: string,
) => {
  const [repositoryName, organizationName] = githubRepositoryLink
    .split("/")
    .reverse()

  const response = await ofetch<{
    total_count: number
  }>(`https://api.github.com/search/issues`, {
    query: {
      q: `repo:${organizationName}/${repositoryName} is:issue`,
      page: 1,
      per_page: 1,
    },
    headers: {
      Authorization: `Bearer ${env.GITHUBPAT_TOKEN}`,
    },
  })

  const { total_count } = response

  return total_count
}
