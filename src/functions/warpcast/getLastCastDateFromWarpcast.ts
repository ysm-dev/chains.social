import { getWarpcastUserCasts } from "@/functions/warpcast/getWarpcastUserCasts"
import { getWarpcastUserInfo } from "@/functions/warpcast/getWarpcastUserInfo"
import { getLastSegment } from "@/utils/getLastSegment"
import { warpcastURLSchema } from "@/validators/warpcast"

export const getLastCastDateFromWarpcast = async (warpcastLink: string) => {
  const validUrl = warpcastURLSchema.parse(warpcastLink)

  const userName = getLastSegment(validUrl)

  const userInfo = await getWarpcastUserInfo(userName)

  const response = await getWarpcastUserCasts(userInfo.result.user.fid)

  if (response.result.casts.length === 0) {
    return null
  }

  return new Date(response.result.casts[0].timestamp).toISOString()
}
