import { getYoutubeChannelInfo } from "@/functions/youtube/getYoutubeChannelInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getViewCountFromYoutube = async (youtubeLink: string) => {
  const channelId = getLastSegment(youtubeLink)

  const {
    statistics: { viewCount },
  } = await getYoutubeChannelInfo(channelId)

  return +viewCount
}
