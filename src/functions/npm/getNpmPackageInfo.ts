import { ofetch } from "@/lib/ofetch"
import { memoize } from "@fxts/core"
import { z } from "zod"

/*
  x-ratelimit-limit: none
  x-ratelimit-rest: none
*/
export const getNpmPackageInfo = memoize(async (packageName: string) => {
  const response = await ofetch<GetNpmPackageInfoResponse>(
    `https://registry.npmjs.org/${packageName}`,
  )

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
