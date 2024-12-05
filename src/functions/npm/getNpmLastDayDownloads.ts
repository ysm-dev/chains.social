import { memoize } from "@fxts/core"
import { z } from "zod"

export const getNpmLastDayDownloads = memoize(async (packageName: string) => {
  const response = await fetch(
    `https://api.npmjs.org/downloads/point/last-day/${packageName}`,
  ).then((res) => res.json())

  return getNpmLastDayDownloadsSchema.parse(response)
})

export const getNpmLastDayDownloadsSchema = z.object({
  downloads: z.number(),
  start: z.string(),
  end: z.string(),
  package: z.string(),
})

export type GetNpmPackageDownloadsResponse = z.infer<
  typeof getNpmLastDayDownloadsSchema
>
