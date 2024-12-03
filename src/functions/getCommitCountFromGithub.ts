import { getGithubRepositoryContributors } from "@/functions/github/getGithubRepositoryContributors"
import { getLastSegment } from "@/utils/getLastSegment"

export const getCommitCountFromGithub = async (
  githubRepositoryLink: string,
) => {
  const [organizationName, repositoryName] = getLastSegment(
    githubRepositoryLink,
    2,
  )

  const response = await getGithubRepositoryContributors(
    organizationName,
    repositoryName,
  )

  const { commitCount } = response

  return commitCount
}
