import { getGithubOrganizationInfo } from "@/functions/github/getGithubOrganizationInfo"
import { getLastSegment } from "@/utils/getLastSegment"
import { githubOrgURLSchema } from "@/validators/github"

export const getFollowerCountFromGithub = async (
  githubOrganizationUrl: string,
) => {
  const validUrl = githubOrgURLSchema.parse(githubOrganizationUrl)
  const organizationName = getLastSegment(validUrl)
  const res = await getGithubOrganizationInfo(organizationName)

  const { followers } = res

  return followers
}
