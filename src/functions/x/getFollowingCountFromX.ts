import { getNpmPackageInfo } from "@/functions/npm/getNpmPackageInfo"
import { getXUserInfo } from "@/functions/x/getXUserInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getFollowingCountFromX = async (xLink: string) => {
  const screenName = getLastSegment(xLink)

  const { friends_count } = await getXUserInfo(screenName)

  return friends_count
}
