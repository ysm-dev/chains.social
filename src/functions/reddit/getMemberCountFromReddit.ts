import { getRedditCommunityMemberCount } from "@/functions/reddit/getRedditCommunityMemberCount"
import { getLastSegment } from "@/utils/getLastSegment"
import { subredditURLSchema } from "@/validators/reddit"

export const getMemberCountFromReddit = async (redditLink: string) => {
  const validUrl = subredditURLSchema.parse(redditLink)

  const communityName = getLastSegment(validUrl)

  const memberCount = getRedditCommunityMemberCount(communityName)

  return memberCount
}
