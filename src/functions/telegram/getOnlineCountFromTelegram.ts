import { getTelegramGroupChatInfo } from "@/functions/telegram/getTelegramGroupChatInfo"
import { getLastSegment } from "@/utils/getLastSegment"
import { telegramURLSchema } from "@/validators/telegram"

export const getOnlineCountFromTelegram = async (telegramLink: string) => {
  const validLink = telegramURLSchema.parse(telegramLink)

  const groupChatSlug = getLastSegment(validLink)

  const { onlineCount } = await getTelegramGroupChatInfo(groupChatSlug)

  return onlineCount
}
