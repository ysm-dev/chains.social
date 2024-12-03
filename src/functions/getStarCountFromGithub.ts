import { getGithubRepositoryInfo } from "@/functions/github/getGithubRepositoryInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getStarCountFromGithub = async (githubRepositoryLink: string) => {
  const [organizationName, repositoryName] = getLastSegment(
    githubRepositoryLink,
    2,
  )

  const response = await getGithubRepositoryInfo(
    organizationName,
    repositoryName,
  )

  const { watchers_count } = response

  return watchers_count
}
