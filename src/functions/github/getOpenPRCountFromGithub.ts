import { getGithubPRCount } from "@/functions/github/getGithubPRCount"
import { githubRepoURLSchema } from "@/validators/github"

export const getOpenPRCountFromGithub = async (githubRepositoryUrl: string) => {
  const validUrl = githubRepoURLSchema.parse(githubRepositoryUrl)
  const [repositoryName, organizationName] = validUrl.split("/").reverse()

  const { openPRCount } = await getGithubPRCount(
    repositoryName,
    organizationName,
  )

  return openPRCount
}
