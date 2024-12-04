import { getYoutubeChannelInfo } from "@/functions/youtube/getYoutubeChannelInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getSubscriberCountFromYoutube = async (youtubeLink: string) => {
  const channelId = getLastSegment(youtubeLink)

  const response = await getYoutubeChannelInfo(channelId)
  if (!response) {
    return null
  }

  const {
    statistics: { subscriberCount },
  } = response

  return +subscriberCount
}
