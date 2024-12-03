import { getNpmPackageInfo } from "@/functions/npm/getNpmPackageInfo"
import { getLastSegment } from "@/utils/getLastSegment"

export const getLastReleasedDateFromNpm = async (npmLink: string) => {
  const packageName = npmLink.split("https://www.npmjs.com/package/").pop()
  if (!packageName) {
    return null
  }

  const data = await getNpmPackageInfo(packageName)

  return data.time.modified
}
