import { getWarpcastUserInfo } from "@/functions/warpcast/getWarpcastUserInfo"
import { describe, expect, it } from "vitest"

describe("getWarpcastUserInfo function format tests", () => {
  it("solana", async () => {
    const userName = "solana"

    const response = await getWarpcastUserInfo(userName)

    expect(response.result.user.username).toBe(userName)
  })
})
