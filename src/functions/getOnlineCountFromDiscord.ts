import { getDiscordInviteInfo } from "@/functions/discord/getDiscordInviteInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getOnlineCountFromDiscord = async (discordLink: string) => {
  const inviteId = getLastSegment(discordLink)
  const res = await getDiscordInviteInfo(inviteId)

  const { approximate_presence_count } = res

  return approximate_presence_count
}
