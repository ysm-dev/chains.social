import { getGithubRepositoryContributors } from "@/functions/github/getGithubRepositoryContributors"
import { getLastSegment } from "@/utils/getLastSegment"

export const getCommitByUserCountFromGithub = async (
  githubRepositoryLink: string,
) => {
  const [repositoryName, organizationName] = githubRepositoryLink
    .split("/")
    .reverse()

  const response = await getGithubRepositoryContributors(
    organizationName,
    repositoryName,
  )

  const { commitByUserCount } = response

  return commitByUserCount
}
