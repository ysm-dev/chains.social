import { getYoutubeChannelId } from "@/functions/youtube/getYoutubeChannelId"
import { getYoutubeChannelInfo } from "@/functions/youtube/getYoutubeChannelInfo"
import { youtubeUrlSchema } from "@/validators/youtube"

export const getViewCountFromYoutube = async (youtubeChannelId: string) => {
  const {
    statistics: { viewCount },
  } = await getYoutubeChannelInfo(youtubeChannelId)

  return +viewCount
}
