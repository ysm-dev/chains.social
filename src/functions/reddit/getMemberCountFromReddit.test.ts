import { getMemberCountFromReddit } from "@/functions/reddit/getMemberCountFromReddit"
import { describe, expect, it } from "vitest"

describe("getMemberCountFromReddit function format tests", () => {
  it("solana", async () => {
    const count = await getMemberCountFromReddit("https://reddit.com/r/solana")

    expect(count).toBeGreaterThan(0)
  })

  it("ripple", async () => {
    const count = await getMemberCountFromReddit("https://reddit.com/r/XRP")

    expect(count).toBeGreaterThan(0)
  })
})
