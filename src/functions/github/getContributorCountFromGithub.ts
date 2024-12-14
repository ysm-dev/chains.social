import { getGithubRepositoryContributors } from "@/functions/github/getGithubRepositoryContributors"
import { githubRepoURLSchema } from "@/validators/github"

export const getContributorCountFromGithub = async (
  githubRepositoryUrl: string,
) => {
  const validUrl = githubRepoURLSchema.parse(githubRepositoryUrl)
  const [repositoryName, organizationName] = validUrl.split("/").reverse()

  const response = await getGithubRepositoryContributors(
    organizationName,
    repositoryName,
  )

  const { contributorCount } = response

  return contributorCount
}
