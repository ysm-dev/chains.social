import { getWarpcastUserInfo } from "@/functions/warpcast/getWarpcastUserInfo"
import { warpcastURLSchema } from "@/validators/warpcast"

export const getFollowingCountFromWarpcast = async (warpcastLink: string) => {
  const validUrl = warpcastURLSchema.parse(warpcastLink)

  const response = await getWarpcastUserInfo(validUrl)

  return response.result.user.followingCount
}
