import { getRedditAccessToken } from "@/functions/reddit/getRedditAccessToken"
import { describe, expect, it } from "vitest"

describe.skip("getRedditAccessToken function format tests", () => {
  it("getRedditAccessToken", async () => {
    const response = await getRedditAccessToken()

    expect(response.token_type).toBe("bearer")
    expect(response.access_token).toBeTruthy()
  })
})
