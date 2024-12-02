import { getDiscordInviteInfo } from "@/functions/discord/getDiscordMemberCount"

export const getMemberCountFromDiscord = async (discordLink: string) => {
  const inviteId = discordLink.split("/")[discordLink.split("/").length - 1]
  const res = await getDiscordInviteInfo(inviteId)

  const { approximate_member_count } = res

  return approximate_member_count
}
