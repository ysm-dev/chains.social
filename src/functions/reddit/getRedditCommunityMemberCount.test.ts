import { getRedditCommunityMemberCount } from "@/functions/reddit/getRedditCommunityMemberCount"
import { describe, expect, it } from "vitest"

describe("getRedditCommunityMemberCount", () => {
  it.skip("solana", async () => {
    const memberCount = await getRedditCommunityMemberCount("solana")

    expect(memberCount).toBeGreaterThan(0)
  })

  it("polkadot", async () => {
    const memberCount = await getRedditCommunityMemberCount("Polkadot")

    expect(memberCount).toBeGreaterThan(0)
  })
})
