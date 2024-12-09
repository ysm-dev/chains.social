import { getSimInfo } from "@/functions/sim/getSimInfo"
import { urlSchema } from "@/validators/urlSchema"

export const getMonthlyVisitorCountFromSim = async (officialLink: string) => {
  const validUrl = urlSchema.parse(officialLink)

  const { hostname } = new URL(validUrl)

  const {
    Engagments: { Visits },
  } = await getSimInfo(hostname)

  return +Visits
}
