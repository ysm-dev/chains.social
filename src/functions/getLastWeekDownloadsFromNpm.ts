import { getNpmLastWeekDownloads } from "@/functions/npm/getNpmLastWeekDownloads"
import { getLastSegment } from "@/utils/getLastSegment"

export const getLastWeekDownloadsFromNpm = async (npmLink: string) => {
  const packageName = npmLink.replace("https://www.npmjs.com/package/", "")

  const { downloads } = await getNpmLastWeekDownloads(packageName)

  return downloads
}
