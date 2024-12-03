import { getGithubRepositoryIssues } from "@/functions/github/getGithubRepositoryIssues"
import { getLastSegment } from "@/utils/getLastSegment"

export const getOpenIssueCountFromGithub = async (
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

  const { openIssueCount } = response

  return openIssueCount
}
