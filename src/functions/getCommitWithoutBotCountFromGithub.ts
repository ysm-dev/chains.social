import { getGithubRepositoryContributors } from "@/functions/github/getGithubRepositoryContributors"
import { getLastSegment } from "@/utils/getLastSegment"

export const getCommitWithoutBotCountFromGithub = async (
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

  const { commitWithoutBotCount } = response

  return commitWithoutBotCount
}
