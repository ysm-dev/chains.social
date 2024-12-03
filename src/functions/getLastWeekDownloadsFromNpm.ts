import { getNpmLastWeekDownloads } from "@/functions/npm/getNpmLastWeekDownloads"
import { getLastSegment } from "@/utils/getLastSegment"

export const getLastWeekDownloadsFromNpm = async (npmLink: string) => {
  const packageName = npmLink.split("https://www.npmjs.com/package/").pop()
  if (!packageName) {
    return null
  }

  const { downloads } = await getNpmLastWeekDownloads(packageName)

  return downloads
}
