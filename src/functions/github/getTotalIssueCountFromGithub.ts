import { getGithubIssueCount } from "@/functions/github/getGithubIssueCount"
import { githubRepoURLSchema } from "@/validators/github"

export const getTotalIssueCountFromGithub = async (
  githubRepositoryUrl: string,
) => {
  const validUrl = githubRepoURLSchema.parse(githubRepositoryUrl)
  const [repositoryName, organizationName] = validUrl.split("/").reverse()

  const { openIssueCount, closedIssueCount } = await getGithubIssueCount(
    repositoryName,
    organizationName,
  )

  return openIssueCount + closedIssueCount
}
