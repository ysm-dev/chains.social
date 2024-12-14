import { getGithubRepositoryInfo } from "@/functions/github/getGithubRepositoryInfo"

export const getStarCountFromGithub = async (githubRepositoryLink: string) => {
  const [repositoryName, organizationName] = githubRepositoryLink
    .split("/")
    .reverse()

  const response = await getGithubRepositoryInfo(
    organizationName,
    repositoryName,
  )

  const { watchers_count } = response

  return watchers_count
}
