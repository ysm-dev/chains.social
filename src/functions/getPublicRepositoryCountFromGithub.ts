import { getDiscordInviteInfo } from "@/functions/discord/getDiscordInviteInfo"
import { getGithubOrganizationInfo } from "@/functions/github/getGithubOrganizationInfo"

export const getPublicRepositoryCountFromGithub = async (
  githubOrganizationLink: string,
) => {
  const organizationName =
    githubOrganizationLink.split("/")[
      githubOrganizationLink.split("/").length - 1
    ]
  const res = await getGithubOrganizationInfo(organizationName)

  const { public_repos } = res

  return public_repos
}
