import { getGithubRepositoryRelease } from "@/functions/github/getGithubRepositoryRelease"
import { githubRepoURLSchema } from "@/validators/github"

export const getLatestReleaseNameFromGithub = async (
  githubRepositoryUrl: string,
) => {
  const validUrl = githubRepoURLSchema.parse(githubRepositoryUrl)
  const [repositoryName, organizationName] = validUrl.split("/").reverse()

  const data = await getGithubRepositoryRelease(
    organizationName,
    repositoryName,
  )

  return data ? data.name : null
}
