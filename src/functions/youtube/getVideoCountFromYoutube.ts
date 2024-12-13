import { getYoutubeChannelInfo } from "@/functions/youtube/getYoutubeChannelInfo"

export const getVideoCountFromYoutube = async (youtubeChannelId: string) => {
  const {
    statistics: { videoCount },
  } = await getYoutubeChannelInfo(youtubeChannelId)

  return +videoCount
}
