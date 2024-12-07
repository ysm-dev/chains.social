import { getYoutubeChannelVideos } from "@/functions/youtube/getYoutubeChannelVideos"
import { getLastSegment } from "@/utils/getLastSegment"

export const getLastVideoDateFromYoutube = async (youtubeLink: string) => {
  const channelId = getLastSegment(youtubeLink)

  const data = await getYoutubeChannelVideos(channelId)

  const { publishedAt } = data.items[0].snippet

  return publishedAt
}
