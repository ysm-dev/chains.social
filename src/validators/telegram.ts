import { urlSchema } from "@/validators/urlSchema"
import { z } from "zod"

export const telegramURLSchema = z.custom<string>((param) => {
  const url = urlSchema.parse(param)
  const { hostname, pathname } = new URL(url)
  return hostname === "t.me" && pathname.split("/").length === 2
})
