export const getDiscordMemberCount = async (discordLink: string) => {
  const inviteId = discordLink.split("/")[discordLink.split("/").length - 1]
  const res = await fetch(
    `https://discord.com/api/invites/${inviteId}?${new URLSearchParams({
      with_counts: "true",
    })}`,
  ).then<R>((res) => res.json())

  const { approximate_member_count, approximate_presence_count } = res

  return {
    memberCount: approximate_member_count,
    onlineCount: approximate_presence_count,
  }
}

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
