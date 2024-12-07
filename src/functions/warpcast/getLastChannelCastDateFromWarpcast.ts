import { getWarpcastChannelCasts } from "@/functions/warpcast/getWarpcastChannelCasts"
import { getLastSegment } from "@/utils/getLastSegment"
import {
  warpcastChannelURLSchema,
  warpcastURLSchema,
} from "@/validators/warpcast"

export const getLastChannelCastDateFromWarpcast = async (
  warpcastChannelLink: string,
) => {
  console.log({ warpcastChannelLink })
  const validUrl = warpcastChannelURLSchema.parse(warpcastChannelLink)

  const channelName = getLastSegment(validUrl)

  const {
    result: { feedTopSeenAtTimestamp },
  } = await getWarpcastChannelCasts(channelName)

  return new Date(feedTopSeenAtTimestamp).toISOString()
}
