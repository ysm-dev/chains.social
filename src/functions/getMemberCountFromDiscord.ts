import { getDiscordInviteInfo } from "@/functions/discord/getDiscordInviteInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getMemberCountFromDiscord = async (discordLink: string) => {
  const [inviteId] = getLastSegment(discordLink)
  const res = await getDiscordInviteInfo(inviteId)

  const { approximate_member_count } = res

  return approximate_member_count
}
