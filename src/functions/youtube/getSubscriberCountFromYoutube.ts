import { getYoutubeChannelInfo } from "@/functions/youtube/getYoutubeChannelInfo"

export const getSubscriberCountFromYoutube = async (
  youtubeChannelId: string,
) => {
  const {
    statistics: { subscriberCount },
  } = await getYoutubeChannelInfo(youtubeChannelId)

  return +subscriberCount
}
