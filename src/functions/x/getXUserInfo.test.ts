import { getNpmLastWeekDownloads } from "@/functions/npm/getNpmLastWeekDownloads"
import { getXUserInfo } from "@/functions/x/getXUserInfo"
import { describe, expect, it, vi } from "vitest"

describe("getXUserInfo function format tests", () => {
  it("should match the expected response format", async () => {
    const userId = "solana"

    const response = await getXUserInfo(userId)

    expect(response.screen_name).toBe(userId)
    expect(response).toMatchObject({
      rest_id: expect.any(String),
      screen_name: expect.any(String),
      followers_count: expect.any(Number),
      friends_count: expect.any(Number),
      statuses_count: expect.any(Number),
    })
  })
})
