import { getGithubPRCount } from "@/functions/github/getGithubPRCount"
import { githubRepoURLSchema } from "@/validators/github"

export const getClosedPRCountFromGithub = async (
  githubRepositoryUrl: string,
) => {
  const validUrl = githubRepoURLSchema.parse(githubRepositoryUrl)
  const [repositoryName, organizationName] = validUrl.split("/").reverse()

  const { closedPRCount } = await getGithubPRCount(
    repositoryName,
    organizationName,
  )

  return closedPRCount
}
