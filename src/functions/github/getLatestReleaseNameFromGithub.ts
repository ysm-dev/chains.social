import { getGithubRepositoryRelease } from "@/functions/github/getGithubRepositoryRelease"

export const getLatestReleaseNameFromGithub = async (
  githubRepositoryLink: string,
) => {
  const [repositoryName, organizationName] = githubRepositoryLink
    .split("/")
    .reverse()

  const data = await getGithubRepositoryRelease(
    organizationName,
    repositoryName,
  )

  return data ? data.name : null
}
