import { getWarpcastChannelInfo } from "@/functions/warpcast/getWarpcastChannelInfo"
import { describe, expect, it } from "vitest"

describe("getWarpcastChannelInfo", () => {
  it("bitcoin", async () => {
    const channelName = "bitcoin"

    const response = await getWarpcastChannelInfo(channelName)

    expect(response.result.details.lead.followerCount).toBeGreaterThan(0)
    expect(response.result.details.lead.followingCount).toBeGreaterThan(0)
  })
})
