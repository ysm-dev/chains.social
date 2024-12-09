import { getSimInfo } from "@/functions/sim/getSimInfo"
import { getWarpcastUserInfo } from "@/functions/warpcast/getWarpcastUserInfo"
import { describe, expect, it } from "vitest"

describe("getSimInfo", () => {
  it("etherum", async () => {
    const siteName = "ethereum.org"

    const response = await getSimInfo(siteName)

    expect(response.SiteName).toBe(siteName)
  })
})
