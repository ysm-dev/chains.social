import { getWarpcastUserInfo } from "@/functions/warpcast/getWarpcastUserInfo"
import { getLastSegment } from "@/utils/getLastSegment"
import { warpcastURLSchema } from "@/validators/warpcast"

export const getFollowingCountFromWarpcast = async (warpcastLink: string) => {
  const validUrl = warpcastURLSchema.parse(warpcastLink)

  const userName = getLastSegment(validUrl)

  const response = await getWarpcastUserInfo(userName)

  return response.result.user.followingCount
}
