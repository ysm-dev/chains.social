import { urlSchema } from "@/validators/urlSchema"
import { z } from "zod"

export const githubRepoURLSchema = z.custom<string>((param) => {
  const url = urlSchema.parse(param)
  const { hostname, pathname } = new URL(url)
  return hostname === "github.com" && pathname.split("/").length === 3
})

export const githubOrgURLSchema = z.custom<string>((param) => {
  const url = urlSchema.parse(param)
  const { hostname, pathname } = new URL(url)
  return hostname === "github.com" && pathname.split("/").length === 2
})
