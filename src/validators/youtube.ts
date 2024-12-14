import { urlSchema } from "@/validators/urlSchema"
import { z } from "zod"

export const youtubeUrlSchema = z.custom<string>((value) => {
  const validUrl = urlSchema.parse(value)

  const { pathname } = new URL(validUrl)

  const channelRegex = /^\/channel\/([A-Za-z0-9_-]+)$/
  const handleRegex = /^\/@([\w-]+)$/
  const brandRegex = /^\/c\/([\w-]+)$/
  const customRegex = /^\/([\w-]+)$/

  return (
    channelRegex.test(pathname) ||
    handleRegex.test(pathname) ||
    brandRegex.test(pathname) ||
    customRegex.test(pathname)
  )
})
