import { getGithubIssueCount } from "@/functions/github/getGithubIssueCount"
import { githubRepoURLSchema } from "@/validators/github"

export const getClosedIssueCountFromGithub = async (
  githubRepositoryUrl: string,
) => {
  const validUrl = githubRepoURLSchema.parse(githubRepositoryUrl)
  const [repositoryName, organizationName] = validUrl.split("/").reverse()

  const { closedIssueCount } = await getGithubIssueCount(
    repositoryName,
    organizationName,
  )

  return closedIssueCount
}
