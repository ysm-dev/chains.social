import { memoize } from "@fxts/core"
import { ofetch } from "ofetch"
import { z } from "zod"

/*
  x-ratelimit-limit: none
  x-ratelimit-rest: none
*/
export const getNpmLastWeekDownloads = memoize(async (packageName: string) => {
  const response = await ofetch<GetNpmPackageInfoResponse>(
    `https://api.npmjs.org/downloads/point/last-week/${packageName}`,
  )

  return getNpmPackageInfoSchema.parse(response)
})

export const getNpmPackageInfoSchema = z.object({
  downloads: z.number(),
  start: z.string(),
  end: z.string(),
  package: z.string(),
})

export type GetNpmPackageInfoResponse = z.infer<typeof getNpmPackageInfoSchema>
