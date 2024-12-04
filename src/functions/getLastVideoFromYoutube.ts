import { getYoutubeChannelVideo } from "@/functions/youtube/getYoutubeChannelVideo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getLastVideoFromYoutube = async (youtubeLink: string) => {
  const channelId = getLastSegment(youtubeLink)

  const response = await getYoutubeChannelVideo(channelId)
  if (!response) {
    return null
  }

  const { snippet } = response

  return snippet
}
