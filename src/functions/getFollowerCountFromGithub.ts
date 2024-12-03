import { getGithubOrganizationInfo } from "@/functions/github/getGithubOrganizationInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getFollowerCountFromGithub = async (
  githubOrganizationLink: string,
) => {
  const [organizationName] = getLastSegment(githubOrganizationLink)
  const res = await getGithubOrganizationInfo(organizationName)

  const { followers } = res

  return followers
}
