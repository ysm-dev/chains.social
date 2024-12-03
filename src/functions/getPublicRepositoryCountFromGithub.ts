import { getDiscordInviteInfo } from "@/functions/discord/getDiscordInviteInfo"
import { getGithubOrganizationInfo } from "@/functions/github/getGithubOrganizationInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getPublicRepositoryCountFromGithub = async (
  githubOrganizationLink: string,
) => {
  const organizationName = getLastSegment(githubOrganizationLink)
  const res = await getGithubOrganizationInfo(organizationName)

  const { public_repos } = res

  return public_repos
}
