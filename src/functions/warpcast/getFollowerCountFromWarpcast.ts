import { getWarpcastUserInfo } from "@/functions/warpcast/getWarpcastUserInfo"
import { warpcastURLSchema } from "@/validators/warpcast"

export const getFollowerCountFromWarpcast = async (warpcastLink: string) => {
  const validUrl = warpcastURLSchema.parse(warpcastLink)

  const response = await getWarpcastUserInfo(validUrl)

  return response.result.user.followerCount
}
