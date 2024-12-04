import { getYoutubeChannelInfo } from "@/functions/youtube/getYoutubeChannelInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getVideoCountFromYoutube = async (youtubeLink: string) => {
  const channelId = getLastSegment(youtubeLink)

  const {
    statistics: { videoCount },
  } = await getYoutubeChannelInfo(channelId)

  return +videoCount
}
