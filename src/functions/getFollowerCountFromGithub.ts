import { getGithubOrganizationInfo } from "@/functions/github/getGithubOrganizationInfo"

export const getFollowerCountFromGithub = async (
  githubOrganizationLink: string,
) => {
  const organizationName =
    githubOrganizationLink.split("/")[
      githubOrganizationLink.split("/").length - 1
    ]
  const res = await getGithubOrganizationInfo(organizationName)

  const { followers } = res

  return followers
}
