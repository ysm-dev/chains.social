import { getGithubRepositoryInfo } from "@/functions/github/getGithubRepositoryInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getForkCountFromGithub = async (githubRepositoryLink: string) => {
  const [organizationName, repositoryName] = getLastSegment(
    githubRepositoryLink,
    2,
  )

  const response = await getGithubRepositoryInfo(
    organizationName,
    repositoryName,
  )

  const { forks_count } = response

  return forks_count
}
