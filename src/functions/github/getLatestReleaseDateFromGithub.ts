import { getGithubRepositoryRelease } from "@/functions/github/getGithubRepositoryRelease"

export const getLatestReleaseDateFromGithub = async (
  githubRepositoryLink: string,
) => {
  const [repositoryName, organizationName] = githubRepositoryLink
    .split("/")
    .reverse()

  const data = await getGithubRepositoryRelease(
    organizationName,
    repositoryName,
  )

  return data ? new Date(data.published_at).toISOString() : null
}
