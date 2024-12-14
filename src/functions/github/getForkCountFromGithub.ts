import { getGithubRepositoryInfo } from "@/functions/github/getGithubRepositoryInfo"
import { githubRepoURLSchema } from "@/validators/github"

export const getForkCountFromGithub = async (githubRepositoryUrl: string) => {
  const validUrl = githubRepoURLSchema.parse(githubRepositoryUrl)
  const [repositoryName, organizationName] = validUrl.split("/").reverse()

  const response = await getGithubRepositoryInfo(
    organizationName,
    repositoryName,
  )

  const { forks_count } = response

  return forks_count
}
