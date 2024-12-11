import { getRedditCommunityLastPostDate } from "@/functions/reddit/getRedditCommunityLastPostDate"
import { describe, expect, it } from "vitest"

describe.skip("getRedditCommunityMemberCount", () => {
  it("solana", async () => {
    const lastPostDate = await getRedditCommunityLastPostDate("solana")

    // check if date is in ISO format
    expect(lastPostDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })
})
