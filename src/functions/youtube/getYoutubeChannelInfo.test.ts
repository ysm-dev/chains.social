import { getYoutubeChannelInfo } from "@/functions/youtube/getYoutubeChannelInfo"
import { describe, expect, it } from "vitest"

describe("getYoutubeChannelInfo function format tests", () => {
  it("solana", async () => {
    const channelId = "UC9AdQPUe4BdVJ8M9X7wxHUA"

    const response = await getYoutubeChannelInfo(channelId)

    expect(response.id).toBe(channelId)
  })

  it("near", async () => {
    const channelId = "UCuKdIYVN8iE3fv8alyk1aMw"

    const response = await getYoutubeChannelInfo(channelId)

    expect(response.id).toBe(channelId)
  })
})
