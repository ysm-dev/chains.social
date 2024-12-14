import { getWarpcastUserInfo } from "@/functions/warpcast/getWarpcastUserInfo"
import { describe, expect, it } from "vitest"

describe("getWarpcastUserInfo function format tests", () => {
  it("Binance Coin", async () => {
    const userName = "bnbchain"

    const expected = 892762

    const response = await getWarpcastUserInfo(userName)

    expect(response.result.user.fid).toBe(expected)
  })
})
