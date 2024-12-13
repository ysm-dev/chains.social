import { urlSchema } from "@/validators/urlSchema"
import { z } from "zod"

export const discordURLSchema = z.custom<string>((param) => {
  const url = urlSchema.parse(param)
  const { hostname, pathname } = new URL(url)

  return (
    hostname === "discord.com" &&
    pathname.split("/").length === 3 &&
    pathname.split("/")[1] === "invite"
  )
})
