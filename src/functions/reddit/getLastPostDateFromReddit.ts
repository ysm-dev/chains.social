import { getRedditCommunityNewPosts } from "@/functions/reddit/getRedditCommunityNewPosts"
import { getLastSegment } from "@/utils/getLastSegment"
import { subredditURLSchema } from "@/validators/reddit"

export const getLastPostDateFromReddit = async (redditLink: string) => {
  const validUrl = subredditURLSchema.parse(redditLink)

  const communityName = getLastSegment(validUrl)

  const response = await getRedditCommunityNewPosts(communityName)

  const lastPostUtc = response.data.children[0].data.created_utc

  return new Date(lastPostUtc * 1000).toISOString()
}
