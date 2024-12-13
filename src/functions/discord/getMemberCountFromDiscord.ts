import { getDiscordInviteInfo } from "@/functions/discord/getDiscordInviteInfo"
import { getLastSegment } from "@/utils/getLastSegment"
import { discordURLSchema } from "@/validators/discord"

export const getMemberCountFromDiscord = async (discordUrl: string) => {
  const validUrl = discordURLSchema.parse(discordUrl)

  const inviteId = getLastSegment(validUrl)
  const res = await getDiscordInviteInfo(inviteId)

  const { approximate_member_count } = res

  return approximate_member_count
}
