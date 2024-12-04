import { urlSchema } from "@/validators/urlSchema"
import { z } from "zod"

export const subredditURLSchema = z.custom<string>((param) => {
  const url = urlSchema.parse(param)
  const { hostname, pathname } = new URL(url)
  return (
    hostname === "reddit.com" &&
    pathname.split("/").length === 3 &&
    pathname.split("/")[1] === "r"
  )
})
