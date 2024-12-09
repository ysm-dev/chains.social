import { memoize } from "@fxts/core"
import { ofetch } from "ofetch"
import { z } from "zod"

export const getSimInfo = memoize(async (hostname: string) => {
  const response = await ofetch<GetSimInfoResponse>(
    `https://data.similarweb.com/api/v1/data?domain=${hostname}`,
    {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      },
    },
  )

  return getSimInfoSchema.parse(response)
})

const getSimInfoSchema = z.object({
  SiteName: z.string(),
  Engagments: z.object({
    Visits: z.string(),
  }),
})

export type GetSimInfoResponse = z.infer<typeof getSimInfoSchema>
