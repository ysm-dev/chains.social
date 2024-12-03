import { getGithubRepositoryIssues } from "@/functions/github/getGithubRepositoryIssues"
import { getLastSegment } from "@/utils/getLastSegment"

export const getClosedIssueCountFromGithub = async (
  githubRepositoryLink: string,
) => {
  const [organizationName, repositoryName] = getLastSegment(
    githubRepositoryLink,
    2,
  )

  const response = await getGithubRepositoryIssues(
    organizationName,
    repositoryName,
  )

  const { closedIssueCount } = response

  return closedIssueCount
}
