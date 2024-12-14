import { getGithubRepositoryBranch } from "@/functions/github/getGithubRepositoryBranch"
import { getGithubRepositoryInfo } from "@/functions/github/getGithubRepositoryInfo"
import { githubRepoURLSchema } from "@/validators/github"

export const getLastCommitDateFromGithub = async (
  githubRepositoryUrl: string,
) => {
  const validUrl = githubRepoURLSchema.parse(githubRepositoryUrl)
  const [repositoryName, organizationName] = validUrl.split("/").reverse()

  const { default_branch } = await getGithubRepositoryInfo(
    organizationName,
    repositoryName,
  )

  const { lastCommitDate } = await getGithubRepositoryBranch(
    organizationName,
    repositoryName,
    default_branch,
  )

  return new Date(lastCommitDate).toISOString()
}
