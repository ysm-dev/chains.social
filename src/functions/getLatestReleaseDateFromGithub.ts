import { getGithubRepositoryRelease } from "@/functions/github/getGithubRepositoryRelease"

export const getLatestReleaseDateFromGithub = async (
  githubRepositoryLink: string,
) => {
  const [repositoryName, organizationName] = githubRepositoryLink
    .split("/")
    .reverse()

  const { published_at } = await getGithubRepositoryRelease(
    organizationName,
    repositoryName,
  )

  return published_at
}
