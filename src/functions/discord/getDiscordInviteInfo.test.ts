import {
  getDiscordInviteInfo,
  getDiscordInviteInfoSchema,
} from "@/functions/discord/getDiscordInviteInfo"
import { describe, expect, it, vi } from "vitest"

describe("getDiscordInviteInfo function format tests", () => {
  it("should match the expected response format", async () => {
    const inviteId = "buildonbase"

    const response = await getDiscordInviteInfo(inviteId)

    expect(response.code).toBe(inviteId)
  })
})
