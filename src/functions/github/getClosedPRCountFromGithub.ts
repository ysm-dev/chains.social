import { getGithubRepositoryPRs } from "@/functions/github/getGithubRepositoryPRs"

export const getClosedPRCountFromGithub = async (
  githubRepositoryLink: string,
) => {
  const [repositoryName, organizationName] = githubRepositoryLink
    .split("/")
    .reverse()

  const response = await getGithubRepositoryPRs(
    organizationName,
    repositoryName,
  )

  const { closedPRCount } = response

  return closedPRCount
}
