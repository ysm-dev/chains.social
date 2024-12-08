import { getGithubRepositoryIssues } from "@/functions/github/getGithubRepositoryIssues"

export const getOpenIssueCountFromGithub = async (
  githubRepositoryLink: string,
) => {
  const [repositoryName, organizationName] = githubRepositoryLink
    .split("/")
    .reverse()

  const response = await getGithubRepositoryIssues(
    organizationName,
    repositoryName,
  )

  const { openIssueCount } = response

  return openIssueCount
}
