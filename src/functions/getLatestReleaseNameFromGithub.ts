import { getGithubRepositoryRelease } from "@/functions/github/getGithubRepositoryRelease"

export const getLatestReleaseNameFromGithub = async (
  githubRepositoryLink: string,
) => {
  const [repositoryName, organizationName] = githubRepositoryLink
    .split("/")
    .reverse()

  const { name } = await getGithubRepositoryRelease(
    organizationName,
    repositoryName,
  )

  return name
}
