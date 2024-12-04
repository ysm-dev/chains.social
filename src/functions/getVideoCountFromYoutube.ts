import { getYoutubeChannelInfo } from "@/functions/youtube/getYoutubeChannelInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getVideoCountFromYoutube = async (youtubeLink: string) => {
  const channelId = getLastSegment(youtubeLink)

  const response = await getYoutubeChannelInfo(channelId)
  if (!response) {
    return null
  }

  const {
    statistics: { videoCount },
  } = response

  return +videoCount
}
