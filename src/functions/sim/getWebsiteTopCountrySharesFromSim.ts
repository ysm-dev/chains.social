import { getSimInfo } from "@/functions/sim/getSimInfo"
import { urlSchema } from "@/validators/urlSchema"

export const getWebsiteTopCountrySharesFromSim = async (
  officialLink: string,
) => {
  const validUrl = urlSchema.parse(officialLink)

  const { hostname } = new URL(validUrl)

  const { TopCountryShares } = await getSimInfo(hostname)

  return TopCountryShares.map((v) => ({
    country: v.Country,
    countryCode: v.CountryCode,
    value: v.Value,
  }))
}
