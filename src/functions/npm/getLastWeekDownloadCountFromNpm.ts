import { getNpmLastWeekDownloads } from "@/functions/npm/getNpmLastWeekDownloads"
import { getLastSegment } from "@/utils/getLastSegment"
import { npmPackageURLSchema } from "@/validators/npm"

export const getLastWeekDownloadCountFromNpm = async (npmLink: string) => {
  const validNpmLink = npmPackageURLSchema.parse(npmLink)

  const packageName = validNpmLink.replace("https://www.npmjs.com/package/", "")

  const { downloads } = await getNpmLastWeekDownloads(packageName)

  return downloads
}
