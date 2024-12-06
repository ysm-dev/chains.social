import { urlSchema } from "@/validators/urlSchema"
import { z } from "zod"

export const warpcastURLSchema = z.custom<string>((param) => {
  const url = urlSchema.parse(param)
  const { hostname, pathname } = new URL(url)
  return hostname === "warpcast.com" && pathname.split("/").length === 2
})
