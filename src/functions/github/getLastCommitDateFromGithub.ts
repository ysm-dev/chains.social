import { getGithubRepositoryBranch } from "@/functions/github/getGithubRepositoryBranch"
import { getGithubRepositoryInfo } from "@/functions/github/getGithubRepositoryInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getLastCommitDateFromGithub = async (
  githubRepositoryLink: string,
) => {
  const [repositoryName, organizationName] = githubRepositoryLink
    .split("/")
    .reverse()

  const { default_branch } = await getGithubRepositoryInfo(
    organizationName,
    repositoryName,
  )

  const { lastCommitDate } = await getGithubRepositoryBranch(
    organizationName,
    repositoryName,
    default_branch,
  )

  return lastCommitDate
}
