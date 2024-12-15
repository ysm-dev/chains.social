import { getRedditCommunityMemberCount } from "@/functions/reddit/getRedditCommunityMemberCount"
import { describe, expect, it } from "vitest"

describe("getRedditCommunityMemberCount", () => {
  it.skip("solana", async () => {
    const memberCount = await getRedditCommunityMemberCount("solana")

    expect(memberCount).toBeGreaterThan(0)
  })

  it.skip("polkadot", async () => {
    const memberCount = await getRedditCommunityMemberCount("Polkadot")

    expect(memberCount).toBeGreaterThan(0)
  })

  it("worldcoid", async () => {
    const memberCount = await getRedditCommunityMemberCount("worldcoin")

    expect(memberCount).toBeGreaterThan(0)
  })
})
