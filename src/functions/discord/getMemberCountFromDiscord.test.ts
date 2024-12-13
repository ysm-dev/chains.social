import { getMemberCountFromDiscord } from "@/functions/discord/getMemberCountFromDiscord"
import { describe, expect, it } from "vitest"

describe("getMemberCountFromDiscord", () => {
  it("solana", async () => {
    const discordUrl = "https://discord.com/invite/solana"

    const response = await getMemberCountFromDiscord(discordUrl)

    expect(response).toBeGreaterThan(0)
  })
})
