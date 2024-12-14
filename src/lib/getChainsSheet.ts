import { ofetch } from "@/lib/ofetch"
import { map, pipe, toArray } from "@fxts/core"
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
    const obj: { [key: string]: string | null } = {}
    headers.forEach((header, index) => {
      obj[header] = row[index].replace(/^"|"$/g, "").trim() || null // 값이 없으면 빈 문자열
    })
    return obj
  })

  const data = getChainsSheetSchema.parse(jsonArray)

  return pipe(
    data,
    map((v) => ({
      name: v.Name,
      slug: v["Key (slug)"],
      type: v.type,
      symbol: v.Symbol,
      founder: v.Founder,
      founded: v.Founded,
      firstBlock: v.FirstBlock,
      hq: v.HQ,
      isMainnet: v.isMainnet,
      websiteUrl: v.Website,
      gitHubOrganizationUrl: v.GitHub,
      gitHubRepositoryUrl: v["GitHub main repo"],
      xUrl: v["𝕏"],
      linkedInUrl: v.LinkedIn,
      youtubeUrl: v.Youtube,
      youtubeChannelId: v["Youtube Channel ID"],
      telegramUrl: v.Telegram,
      discordUrl: v.Discord,
      redditUrl: v.Reddit,
      warpcastProfileUrl: v["Farcaster Profile"],
      warpcastChannelUrl: v["Farcaster Channel"],
      blogUrl: v.Blog,
      npmUrl: v.Npm,
    })),
    toArray,
  )
}

const getChainsSheetSchema = z.array(
  z.object({
    Name: z.string().nullable(),
    ["Key (slug)"]: z.string().nullable(),
    type: z.string().nullable(),
    Symbol: z.string().nullable(),
    Founder: z.string().nullable(),
    Founded: z.string().nullable(),
    FirstBlock: z.string().nullable(),
    HQ: z.string().nullable(),
    isMainnet: z.string().nullable(),
    Website: z.string().nullable(),
    GitHub: z.string().nullable(),
    ["GitHub main repo"]: z.string().nullable(),
    𝕏: z.string().nullable(),
    LinkedIn: z.string().nullable(),
    Youtube: z.string().nullable(),
    ["Youtube Channel ID"]: z.string().nullable(),
    Telegram: z.string().nullable(),
    Discord: z.string().nullable(),
    Reddit: z.string().nullable(),
    ["Farcaster Profile"]: z.string().nullable(),
    ["Farcaster Channel"]: z.string().nullable(),
    Blog: z.string().nullable(),
    Npm: z.string().nullable(),
  }),
)
