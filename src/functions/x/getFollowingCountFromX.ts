import { getNpmPackageInfo } from "@/functions/npm/getNpmPackageInfo"
import { getXUserInfo } from "@/functions/x/getXUserInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getFollowingCountFromX = async (xLink: string) => {
  const userId = getLastSegment(xLink)

  const { friends_count } = await getXUserInfo(userId)

  return friends_count
}
