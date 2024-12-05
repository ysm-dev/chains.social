import { getNpmPackageInfo } from "@/functions/npm/getNpmPackageInfo"
import { getXUserInfo } from "@/functions/x/getXUserInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getFollowerCountFromX = async (xLink: string) => {
  const userId = getLastSegment(xLink)

  const { followers_count } = await getXUserInfo(userId)

  return followers_count
}
