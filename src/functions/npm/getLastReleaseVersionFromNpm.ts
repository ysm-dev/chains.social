import { getNpmPackageInfo } from "@/functions/npm/getNpmPackageInfo"

export const getLastReleaseVersionFromNpm = async (npmLink: string) => {
  if (!npmLink.startsWith("https://www.npmjs.com/package/")) {
    throw new Error("Invalid npm link")
  }

  const packageName = npmLink.replace("https://www.npmjs.com/package/", "")

  const data = await getNpmPackageInfo(packageName)

  return data["dist-tags"].latest
}