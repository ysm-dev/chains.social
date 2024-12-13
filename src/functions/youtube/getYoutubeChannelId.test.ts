import { getYoutubeChannelId } from "@/functions/youtube/getYoutubeChannelId"
import { describe, expect, it } from "vitest"

describe("getYoutubeChannelId", () => {
  it("/channel/<channel-id>", async () => {
    const youtubeUrl =
      "https://www.youtube.com/channel/UC6rYoXJ_3BbPyWx_GQDDRRQ"

    const expected = "UC6rYoXJ_3BbPyWx_GQDDRRQ"

    const response = await getYoutubeChannelId(youtubeUrl)

    expect(response).toBe(expected)
  })

  it("/@<handle>", async () => {
    const youtubeUrl = "https://youtube.com/@SolanaFndn"

    const expected = "UC9AdQPUe4BdVJ8M9X7wxHUA"

    const response = await getYoutubeChannelId(youtubeUrl)

    expect(response).toBe(expected)
  })

  it("/c/<custom>", async () => {
    const youtubeUrl = "https://youtube.com/c/Circlecryptofinance"

    const expected = "UCzQMzwoT-Mj_TXggCLUT7Lw"

    const response = await getYoutubeChannelId(youtubeUrl)

    expect(response).toBe(expected)
  })

  it("/<custom>", async () => {
    const youtubeUrl = "https://youtube.com/MakerDAO"

    const expected = "UC4jqZlzQHUhzqf5rMd5ywTw"

    const response = await getYoutubeChannelId(youtubeUrl)

    expect(response).toBe(expected)
  })
})
