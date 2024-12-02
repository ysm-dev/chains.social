import { memoize } from "@fxts/core"
import { z } from "zod"

export const getGithubOrganizationInfo = memoize(
  async (organizationName: string) => {
    const res = await fetch(` https://api.github.com/orgs/${organizationName}`)
    const result: GetDiscordInviteInfoResponse = await res.json()
    return result
  },
)

export const getGithubOrganizationInfoSchema = z.object({
  login: z.string(),
  id: z.number(),
  node_id: z.string(),
  url: z.string(),
  repos_url: z.string(),
  events_url: z.string(),
  hooks_url: z.string(),
  issues_url: z.string(),
  members_url: z.string(),
  public_members_url: z.string(),
  avatar_url: z.string(),
  description: z.string(),
  name: z.string(),
  company: z.null(),
  blog: z.string().nullable(),
  location: z.string().nullable(),
  email: z.string().nullable(),
  twitter_username: z.string().nullable(),
  is_verified: z.boolean(),
  has_organization_projects: z.boolean(),
  has_repository_projects: z.boolean(),
  public_repos: z.number(),
  public_gists: z.number(),
  followers: z.number(),
  following: z.number(),
  html_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  archived_at: z.null(),
  type: z.string(),
})

export type GetDiscordInviteInfoResponse = z.infer<
  typeof getGithubOrganizationInfoSchema
>
