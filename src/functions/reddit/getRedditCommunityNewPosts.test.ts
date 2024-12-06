import { getRedditCommunityNewPosts } from "@/functions/reddit/getRedditCommunityNewPosts"
import { describe, expect, it } from "vitest"

describe("getRedditCommunityNewPosts function format tests", () => {
  it("solana", async () => {
    const {
      data: { children },
    } = await getRedditCommunityNewPosts("solana")

    expect(children.length).toBeGreaterThan(0)
  })
})
