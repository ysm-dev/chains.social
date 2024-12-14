import { getGithubRepositoryInfo } from "@/functions/github/getGithubRepositoryInfo"
import { githubRepoURLSchema } from "@/validators/github"

export const getStarCountFromGithub = async (githubRepositoryUrl: string) => {
  const validUrl = githubRepoURLSchema.parse(githubRepositoryUrl)
  const [repositoryName, organizationName] = validUrl.split("/").reverse()

  const response = await getGithubRepositoryInfo(
    organizationName,
    repositoryName,
  )

  const { watchers_count } = response

  return watchers_count
}
