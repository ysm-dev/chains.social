import { getYoutubeChannelLastVideo } from "@/functions/youtube/getYoutubeChannelLastVideo"
import { describe, expect, it } from "vitest"

describe("getYoutubeChannelLastVideo", () => {
  it("solana", async () => {
    const channelId = "UC9AdQPUe4BdVJ8M9X7wxHUA"

    const response = await getYoutubeChannelLastVideo(channelId)

    expect(response.id).toBe(channelId)
  })
})
