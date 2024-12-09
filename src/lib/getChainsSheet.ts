import { ofetch } from "ofetch"
import { z } from "zod"

export const getChainsSheet = async () => {
  const csvText = await ofetch<string>(
    "https://docs.google.com/spreadsheets/d/1wTlBs8JgUjvYS_g7BnT7Ch_XjsZmwQqT0VEQ5SEdUk4/gviz/tq",
    {
      query: {
        tqx: "out:csv",
      },
      parseResponse: (txt) => txt,
    },
  )

  const rows = csvText.split("\n").map((row) => row.split(","))

  if (rows.length < 2) {
    throw new Error("No data found in the spreadsheet.")
  }

  const headers = rows[0].map((header) => header.replace(/^"|"$/g, "").trim())
  const dataRows = rows.slice(1)

  const jsonArray = dataRows.map((row) => {
    const obj: { [key: string]: string } = {}
    headers.forEach((header, index) => {
      obj[header] = row[index].replace(/^"|"$/g, "").trim() || "" // 값이 없으면 빈 문자열
    })
    return obj
  })

  return getChainsSheetSchema.parse(jsonArray)
}

const getChainsSheetSchema = z.array(
  z.object({
    Name: z.string().optional(),
    Key: z.string().optional(),
    type: z.string().optional(),
    Symbol: z.string().optional(),
    Founder: z.string().optional(),
    Founded: z.string().optional(),
    FirstBlock: z.string().optional(),
    HQ: z.string().optional(),
    isMainnet: z.string().optional(),
    Website: z.string().optional(),
    GitHub: z.string().optional(),
    ["GitHub main repo"]: z.string().optional(),
    X: z.string().optional(),
    LinkedIn: z.string().optional(),
    Youtube: z.string().optional(),
    Telegram: z.string().optional(),
    Discord: z.string().optional(),
    Reddit: z.string().optional(),
    ["Farcaster Profile"]: z.string().optional(),
    ["Farcaster Channel"]: z.string().optional(),
    Blog: z.string().optional(),
    ["JS Library"]: z.string().optional(),
  }),
)
