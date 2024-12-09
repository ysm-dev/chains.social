import { getSimInfo } from "@/functions/sim/getSimInfo"
import { urlSchema } from "@/validators/urlSchema"

export const getGlobalWebsiteRankFromSim = async (officialLink: string) => {
  const validUrl = urlSchema.parse(officialLink)

  const { hostname } = new URL(validUrl)

  const {
    GlobalRank: { Rank },
  } = await getSimInfo(hostname)

  return +Rank
}
