import { getWarpcastUserInfo } from "@/functions/warpcast/getWarpcastUserInfo"
import { getYoutubeChannelVideos } from "@/functions/youtube/getYoutubeChannelVideos"
import { describe, expect, it } from "vitest"

describe("getYoutubeChannelVideo function format tests", () => {
  it("solana", async () => {
    const channelId = "UC9AdQPUe4BdVJ8M9X7wxHUA"

    const response = await getYoutubeChannelVideos(channelId)

    expect(response.items.length).toBe(1)
  })
})
