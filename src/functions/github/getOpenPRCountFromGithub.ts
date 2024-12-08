import { getGithubRepositoryPRs } from "@/functions/github/getGithubRepositoryPRs"

export const getOpenPRCountFromGithub = async (
  githubRepositoryLink: string,
) => {
  const [repositoryName, organizationName] = githubRepositoryLink
    .split("/")
    .reverse()

  const response = await getGithubRepositoryPRs(
    organizationName,
    repositoryName,
  )

  const { openPRCount } = response

  return openPRCount
}
