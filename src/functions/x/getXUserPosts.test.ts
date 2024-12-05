import { getXUserPosts } from "@/functions/x/getXUserPosts"
import { describe, expect, it } from "vitest"

describe("getXUserPosts function format tests", () => {
  it("solana", async () => {
    const userId = "951329744804392960"

    const { lastPostDate } = await getXUserPosts(userId)

    // check if date is in ISO format
    expect(lastPostDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })

  it("aptos", async () => {
    const userId = "1582127706560376832"

    const { lastPostDate } = await getXUserPosts(userId)

    expect(lastPostDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })

  it("sui", async () => {
    const userId = "1428872926363754497"

    const { lastPostDate } = await getXUserPosts(userId)

    expect(lastPostDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })
})
