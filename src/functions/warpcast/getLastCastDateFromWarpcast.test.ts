import { getMemberCountFromReddit } from "@/functions/reddit/getMemberCountFromReddit"
import { getLastCastDateFromWarpcast } from "@/functions/warpcast/getLastCastDateFromWarpcast"
import { describe, expect, it } from "vitest"

describe("getLastCastDateFromWarpcast function format tests", () => {
  it("solana", async () => {
    const response = await getLastCastDateFromWarpcast(
      "https://warpcast.com/solana",
    )

    expect(response).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })

  it("avalanche", async () => {
    const response = await getLastCastDateFromWarpcast(
      "https://warpcast.com/avalanche",
    )

    expect(response).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })
})
