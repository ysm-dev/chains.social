import { memoize } from "@fxts/core"
import { z } from "zod"

export const getNpmLastWeekDownloads = memoize(async (packageName: string) => {
  const response = await fetch(
    `https://api.npmjs.org/downloads/point/last-week/${packageName}`,
  ).then((res) => res.json())

  return getNpmPackageInfoSchema.parse(response)
})

export const getNpmPackageInfoSchema = z.object({
  downloads: z.number(),
  start: z.string(),
  end: z.string(),
  package: z.string(),
})

export type GetNpmPackageInfoResponse = z.infer<typeof getNpmPackageInfoSchema>
