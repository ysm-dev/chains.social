import { getWarpcastChannelCasts } from "@/functions/warpcast/getWarpcastChannelCasts"
import { getLastSegment } from "@/utils/getLastSegment"
import { warpcastChannelURLSchema } from "@/validators/warpcast"

export const getChannelLastCastDateFromWarpcast = async (
  warpcastChannelLink: string,
) => {
  const validUrl = warpcastChannelURLSchema.parse(warpcastChannelLink)

  const channelName = getLastSegment(validUrl)

  const {
    result: { feedTopSeenAtTimestamp },
  } = await getWarpcastChannelCasts(channelName)

  return new Date(feedTopSeenAtTimestamp).toISOString()
}
