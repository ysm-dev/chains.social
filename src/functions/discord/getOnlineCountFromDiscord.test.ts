import { getOnlineCountFromDiscord } from "@/functions/discord/getOnlineCountFromDiscord"
import { describe, expect, it } from "vitest"

describe("getOnlineCountFromDiscord function format tests", () => {
  it("should match the expected response format", async () => {
    const discordUrl = "https://discord.com/invite/solana"

    const response = await getOnlineCountFromDiscord(discordUrl)

    expect(response).toBeGreaterThan(0)
  })
})
