import { memoize } from "@fxts/core"
import { z } from "zod"

export const getNpmPackageInfo = memoize(async (packageName: string) => {
  const response = await fetch(
    `https://registry.npmjs.org/${packageName}`,
  ).then((res) => res.json())

  return getNpmPackageInfoSchema.parse(response)
})

export const getNpmPackageInfoSchema = z.object({
  name: z.string(),
  "dist-tags": z.object({
    latest: z.string(),
  }),
  time: z.object({
    modified: z.string(),
  }),
})

export type GetNpmPackageInfoResponse = z.infer<typeof getNpmPackageInfoSchema>
