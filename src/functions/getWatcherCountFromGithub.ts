import { getGithubRepositoryInfo } from "@/functions/github/getGithubRepositoryInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getWatcherCountFromGithub = async (
  githubRepositoryLink: string,
) => {
  const [organizationName, repositoryName] = getLastSegment(
    githubRepositoryLink,
    2,
  )

  const response = await getGithubRepositoryInfo(
    organizationName,
    repositoryName,
  )

  const { subscribers_count } = response

  return subscribers_count
}
