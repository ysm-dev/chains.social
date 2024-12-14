import { getGithubRepositoryInfo } from "@/functions/github/getGithubRepositoryInfo"
import { githubRepoURLSchema } from "@/validators/github"

export const getWatcherCountFromGithub = async (
  githubRepositoryUrl: string,
) => {
  const validUrl = githubRepoURLSchema.parse(githubRepositoryUrl)
  const [repositoryName, organizationName] = validUrl.split("/").reverse()

  const response = await getGithubRepositoryInfo(
    organizationName,
    repositoryName,
  )

  const { subscribers_count } = response

  return subscribers_count
}
