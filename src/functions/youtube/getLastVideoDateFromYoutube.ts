import { getYoutubeChannelLastVideo } from "@/functions/youtube/getYoutubeChannelLastVideo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getLastVideoDateFromYoutube = async (youtubeLink: string) => {
  const channelId = getLastSegment(youtubeLink)

  const data = await getYoutubeChannelLastVideo(channelId)

  const { publishedAt } = data.snippet

  return publishedAt
}
