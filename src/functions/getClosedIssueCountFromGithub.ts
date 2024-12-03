import { getGithubRepositoryIssues } from "@/functions/github/getGithubRepositoryIssues"
import { getLastSegment } from "@/utils/getLastSegment"

export const getClosedIssueCountFromGithub = async (
  githubRepositoryLink: string,
) => {
  const [repositoryName, organizationName] = githubRepositoryLink
    .split("/")
    .reverse()

  const response = await getGithubRepositoryIssues(
    organizationName,
    repositoryName,
  )

  const { closedIssueCount } = response

  return closedIssueCount
}
