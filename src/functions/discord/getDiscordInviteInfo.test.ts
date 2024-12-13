import { getDiscordInviteInfo } from "@/functions/discord/getDiscordInviteInfo"
import { describe, expect, it, vi } from "vitest"

describe("getDiscordInviteInfo", () => {
  it("solana", async () => {
    const inviteId = "solana"

    const response = await getDiscordInviteInfo(inviteId)

    expect(response.code).toBe(inviteId)
  })
})
