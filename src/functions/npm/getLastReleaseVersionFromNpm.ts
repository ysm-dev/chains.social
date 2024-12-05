import { getNpmPackageInfo } from "@/functions/npm/getNpmPackageInfo"
import { npmPackageURLSchema } from "@/validators/npm"

export const getLastReleaseVersionFromNpm = async (npmLink: string) => {
  const validNpmLink = npmPackageURLSchema.parse(npmLink)

  const packageName = validNpmLink.replace("https://www.npmjs.com/package/", "")

  const data = await getNpmPackageInfo(packageName)

  return data["dist-tags"].latest
}
