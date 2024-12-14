import { getGithubRepositoryRelease } from "@/functions/github/getGithubRepositoryRelease"
import { githubRepoURLSchema } from "@/validators/github"

export const getLatestReleaseDateFromGithub = async (
  githubRepositoryUrl: string,
) => {
  const validUrl = githubRepoURLSchema.parse(githubRepositoryUrl)
  const [repositoryName, organizationName] = validUrl.split("/").reverse()

  const data = await getGithubRepositoryRelease(
    organizationName,
    repositoryName,
  )

  return data ? new Date(data.published_at).toISOString() : null
}
