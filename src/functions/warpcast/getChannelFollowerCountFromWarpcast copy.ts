import { getWarpcastChannelInfo } from "@/functions/warpcast/getWarpcastChannelInfo"
import { getLastSegment } from "@/utils/getLastSegment"
import {
  warpcastChannelURLSchema,
  warpcastURLSchema,
} from "@/validators/warpcast"

export const getChannelFollowerCountFromWarpcast = async (
  warpcastChannelLink: string,
) => {
  const validUrl = warpcastChannelURLSchema.parse(warpcastChannelLink)

  const channelName = getLastSegment(validUrl)

  const response = await getWarpcastChannelInfo(channelName)

  return response.result.details.lead.followerCount
}
