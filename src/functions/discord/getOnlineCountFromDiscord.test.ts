import { getOnlineCountFromDiscord } from "@/functions/getOnlineCountFromDiscord"
import { describe, expect, it } from "vitest"

describe("getOnlineCountFromDiscord function format tests", () => {
  it("should match the expected response format", async () => {
    const discordLink = "https://discord.gg/buildonbase"

    const response = await getOnlineCountFromDiscord(discordLink)

    expect(response).toBeGreaterThan(0)
  })
})
