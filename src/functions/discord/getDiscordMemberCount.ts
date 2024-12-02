import { memoize } from "@fxts/core"

export const getDiscordInviteInfo = memoize((inviteId: string) => {
  return fetch(
    `https://discord.com/api/invites/${inviteId}?${new URLSearchParams({
      with_counts: "true",
    })}`,
  ).then<R>((res) => res.json())
})

export interface R {
  type: number
  code: string
  expires_at: null
  flags: number
  guild: Guild
  guild_id: string
  channel: Channel
  approximate_member_count: number
  approximate_presence_count: number
}

export interface Channel {
  id: string
  type: number
  name: string
}

export interface Guild {
  id: string
  name: string
  splash: string
  banner: string
  description: string
  icon: string
  features: string[]
  verification_level: number
  vanity_url_code: string
  nsfw_level: number
  nsfw: boolean
  premium_subscription_count: number
}
