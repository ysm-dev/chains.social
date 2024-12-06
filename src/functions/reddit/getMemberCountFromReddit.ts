import { getRedditAccessToken } from "@/functions/reddit/getRedditAccessToken"
import { getRedditCommunityInfo } from "@/functions/reddit/getRedditCommunityInfo"
import { getLastSegment } from "@/utils/getLastSegment"
import { subredditURLSchema } from "@/validators/reddit"

export const getMemberCountFromReddit = async (redditLink: string) => {
  const validUrl = subredditURLSchema.parse(redditLink)

  const communityName = getLastSegment(validUrl)

  const { access_token } = await getRedditAccessToken()

  const {
    data: { subscribers },
  } = await getRedditCommunityInfo(access_token, communityName)

  return subscribers
}