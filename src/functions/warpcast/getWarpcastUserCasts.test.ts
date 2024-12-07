import { getWarpcastUserCasts } from "@/functions/warpcast/getWarpcastUserCasts"
import { getWarpcastUserInfo } from "@/functions/warpcast/getWarpcastUserInfo"
import { describe, expect, it } from "vitest"

describe("getWarpcastUserCasts.test function format tests", () => {
  it("solana", async () => {
    const fid = 2427

    const response = await getWarpcastUserCasts(fid)

    expect(response.result.casts[0].author.fid).toBe(fid)
  })
})
