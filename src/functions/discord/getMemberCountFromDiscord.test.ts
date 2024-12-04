import { getMemberCountFromDiscord } from "@/functions/getMemberCountFromDiscord"
import { describe, expect, it } from "vitest"

describe("getMemberCountFromDiscord function format tests", () => {
  it("should match the expected response format", async () => {
    const discordLink = "https://discord.gg/buildonbase"

    const response = await getMemberCountFromDiscord(discordLink)

    expect(response).toBeGreaterThan(0)
  })
})
