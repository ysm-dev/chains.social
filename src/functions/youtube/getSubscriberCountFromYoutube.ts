import { getYoutubeChannelInfo } from "@/functions/youtube/getYoutubeChannelInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getSubscriberCountFromYoutube = async (youtubeLink: string) => {
  const channelId = getLastSegment(youtubeLink)

  const {
    statistics: { subscriberCount },
  } = await getYoutubeChannelInfo(channelId)

  return +subscriberCount
}
