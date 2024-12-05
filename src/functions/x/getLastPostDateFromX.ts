import { getNpmPackageInfo } from "@/functions/npm/getNpmPackageInfo"
import { getXUserInfo } from "@/functions/x/getXUserInfo"
import { getXUserPosts } from "@/functions/x/getXUserPosts"
import { getLastSegment } from "@/utils/getLastSegment"

export const getLastPostDateFromX = async (xLink: string) => {
  const screenName = getLastSegment(xLink)

  const { rest_id } = await getXUserInfo(screenName)
  const { lastPostDate } = await getXUserPosts(rest_id)

  return lastPostDate
}
