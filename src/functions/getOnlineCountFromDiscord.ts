import { getDiscordInviteInfo } from "@/functions/discord/getDiscordMemberCount"

export const getOnlineCountFromDiscord = async (discordLink: string) => {
  const inviteId = discordLink.split("/")[discordLink.split("/").length - 1]
  const res = await getDiscordInviteInfo(inviteId)

  const { approximate_presence_count } = res

  return approximate_presence_count
}
