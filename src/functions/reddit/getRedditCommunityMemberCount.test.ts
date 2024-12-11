import { getRedditCommunityMemberCount } from "@/functions/reddit/getRedditCommunityMemberCount"
import { describe, expect, it } from "vitest"

describe("getRedditCommunityMemberCount", () => {
  it("solana", async () => {
    const memberCount = await getRedditCommunityMemberCount("solana")

    expect(memberCount).toBeGreaterThan(0)
  })
})
