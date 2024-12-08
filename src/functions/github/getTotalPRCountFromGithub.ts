import { getGithubRepositoryPRs } from "@/functions/github/getGithubRepositoryPRs"

export const getTotalPRCountFromGithub = async (
  githubRepositoryLink: string,
) => {
  const [repositoryName, organizationName] = githubRepositoryLink
    .split("/")
    .reverse()

  const response = await getGithubRepositoryPRs(
    organizationName,
    repositoryName,
  )

  const { totalPRCount } = response

  return totalPRCount
}
