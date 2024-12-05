import { getXUserInfo } from "@/functions/x/getXUserInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getPostCountFromX = async (xLink: string) => {
  const userId = getLastSegment(xLink)

  const { statuses_count } = await getXUserInfo(userId)

  return statuses_count
}
