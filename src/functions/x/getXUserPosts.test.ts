import { getXUserPosts } from "@/functions/x/getXUserPosts"
import { describe, expect, it } from "vitest"

describe.concurrent("getXUserPosts function format tests", () => {
  it.skip("solana", async () => {
    const restId = "951329744804392960"

    const { lastPostDate } = await getXUserPosts(restId)

    // check if date is in ISO format
    expect(lastPostDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })

  it.skip("aptos", async () => {
    const restId = "1582127706560376832"

    const { lastPostDate } = await getXUserPosts(restId)

    expect(lastPostDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })

  it.skip("sui", async () => {
    const restId = "1428872926363754497"

    const { lastPostDate } = await getXUserPosts(restId)

    expect(lastPostDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })

  it("tether", async () => {
    const restId = "2893133450"

    const { lastPostDate } = await getXUserPosts(restId)

    expect(lastPostDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })
})
