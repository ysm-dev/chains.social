import { getYoutubeChannelVideo } from "@/functions/youtube/getYoutubeChannelVideo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getLastVideoDateFromYoutube = async (youtubeLink: string) => {
  const channelId = getLastSegment(youtubeLink)

  const { snippet } = await getYoutubeChannelVideo(channelId)

  return snippet.publishedAt
}
