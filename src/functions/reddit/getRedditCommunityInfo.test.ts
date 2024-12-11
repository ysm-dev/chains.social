import { getRedditCommunityInfo } from "@/functions/reddit/getRedditCommunityInfo"
import { describe, expect, it } from "vitest"

describe("getRedditCommunityInfo function format tests", () => {
  it("solana", async () => {
    const response = await getRedditCommunityInfo("solana")

    expect(response.data.subscribers).toBeGreaterThan(0)
  })
})
