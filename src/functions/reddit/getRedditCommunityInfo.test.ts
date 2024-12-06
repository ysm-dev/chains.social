import { getRedditAccessToken } from "@/functions/reddit/getRedditAccessToken"
import { getRedditCommunityInfo } from "@/functions/reddit/getRedditCommunityInfo"
import { describe, expect, it } from "vitest"

describe("getRedditCommunityInfo function format tests", () => {
  it("solana", async () => {
    const { access_token } = await getRedditAccessToken()

    const response = await getRedditCommunityInfo(access_token, "solana")

    expect(response.data.subscribers).toBeGreaterThan(0)
  })
})
