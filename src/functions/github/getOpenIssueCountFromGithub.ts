import { getGithubIssueCount } from "@/functions/github/getGithubIssueCount"
import { githubRepoURLSchema } from "@/validators/github"

export const getOpenIssueCountFromGithub = async (
  githubRepositoryUrl: string,
) => {
  const validUrl = githubRepoURLSchema.parse(githubRepositoryUrl)
  const [repositoryName, organizationName] = validUrl.split("/").reverse()

  const { openIssueCount } = await getGithubIssueCount(
    repositoryName,
    organizationName,
  )

  return openIssueCount
}
