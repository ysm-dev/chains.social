import { getNpmPackageInfo } from "@/functions/npm/getNpmPackageInfo"
import { getXUserInfo } from "@/functions/x/getXUserInfo"
import { getXUserTweets } from "@/functions/x/getXUserTweets"
import { getLastSegment } from "@/utils/getLastSegment"

export const getLastTweetDateFromX = async (xLink: string) => {
  const screenName = getLastSegment(xLink)

  const { rest_id } = await getXUserInfo(screenName)
  const { lastTweetDate } = await getXUserTweets(rest_id)

  return lastTweetDate
}
