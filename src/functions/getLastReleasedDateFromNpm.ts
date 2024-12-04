import { getNpmPackageInfo } from "@/functions/npm/getNpmPackageInfo"

export const getLastReleasedDateFromNpm = async (npmLink: string) => {
  const packageName = npmLink.replace("https://www.npmjs.com/package/", "")

  const data = await getNpmPackageInfo(packageName)

  return data.time.modified
}
