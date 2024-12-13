import { getChannelFollowerCountFromWarpcast } from "@/functions/warpcast/getChannelFollowerCountFromWarpcast"
import { describe, expect, it } from "vitest"

describe("getChannelFollowerCountFromWarpcast", () => {
  it("solana", async () => {
    const count = await getChannelFollowerCountFromWarpcast(
      "https://warpcast.com/~/channel/solana",
    )

    expect(count).toBeGreaterThan(0)
  })
})
