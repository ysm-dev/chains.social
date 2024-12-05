import { getNpmLastDayDownloads } from "@/functions/npm/getNpmLastDayDownloads"
import { getNpmLastWeekDownloads } from "@/functions/npm/getNpmLastWeekDownloads"
import { getLastSegment } from "@/utils/getLastSegment"

export const getLastDayDownloadCountFromNpm = async (npmLink: string) => {
  if (!npmLink.startsWith("https://www.npmjs.com/package/")) {
    throw new Error("Invalid npm link")
  }

  const packageName = npmLink.replace("https://www.npmjs.com/package/", "")

  const { downloads } = await getNpmLastDayDownloads(packageName)

  return downloads
}
