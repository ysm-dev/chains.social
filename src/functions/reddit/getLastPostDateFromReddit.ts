import { getRedditCommunityLastPostDate } from "@/functions/reddit/getRedditCommunityLastPostDate"
import { getLastSegment } from "@/utils/getLastSegment"
import { subredditURLSchema } from "@/validators/reddit"

export const getLastPostDateFromReddit = async (redditLink: string) => {
  const validUrl = subredditURLSchema.parse(redditLink)

  const communityName = getLastSegment(validUrl)

  const lastPostDate = await getRedditCommunityLastPostDate(communityName)

  return lastPostDate
}
