import { urlSchema } from "@/validators/urlSchema"

export const npmPackageURLSchema = urlSchema.startsWith(
  "https://www.npmjs.com/package/",
)
