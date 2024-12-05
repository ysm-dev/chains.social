import { getNpmLastWeekDownloads } from "@/functions/npm/getNpmLastWeekDownloads"
import { getLastSegment } from "@/utils/getLastSegment"

export const getLastWeekDownloadCountFromNpm = async (npmLink: string) => {
  if (!npmLink.startsWith("https://www.npmjs.com/package/")) {
    throw new Error("Invalid npm link")
  }

  const packageName = npmLink.replace("https://www.npmjs.com/package/", "")

  const { downloads } = await getNpmLastWeekDownloads(packageName)

  return downloads
}
