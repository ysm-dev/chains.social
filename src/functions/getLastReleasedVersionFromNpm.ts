import { getNpmPackageInfo } from "@/functions/npm/getNpmPackageInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getLastReleasedVersionromNpm = async (npmLink: string) => {
  const packageName = npmLink.replace("https://www.npmjs.com/package/", "")

  const data = await getNpmPackageInfo(packageName)

  return data["dist-tags"].latest
}
