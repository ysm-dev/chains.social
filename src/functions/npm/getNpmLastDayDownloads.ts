import { ofetch } from "@/lib/ofetch"
import { memoize } from "@fxts/core"
import { z } from "zod"

/*
  x-ratelimit-limit: none
  x-ratelimit-rest: none
*/
export const getNpmLastDayDownloads = memoize(async (packageName: string) => {
  const response = await ofetch<GetNpmPackageDownloadsResponse>(
    `https://api.npmjs.org/downloads/point/last-day/${packageName}`,
  )

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
