import { getNpmLastDayDownloads } from "@/functions/npm/getNpmLastDayDownloads"
import { npmPackageURLSchema } from "@/validators/npm"

export const getLastDayDownloadCountFromNpm = async (npmLink: string) => {
  const validNpmLink = npmPackageURLSchema.parse(npmLink)

  const packageName = validNpmLink.replace("https://www.npmjs.com/package/", "")

  const { downloads } = await getNpmLastDayDownloads(packageName)

  return downloads
}
