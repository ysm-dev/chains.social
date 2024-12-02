import {
  getDiscordInviteInfo,
  getDiscordInviteInfoSchema,
} from "@/functions/discord/getDiscordInviteInfo"
import { describe, expect, it, vi } from "vitest"

describe("getDiscordInviteInfo function format tests", () => {
  it("should match the expected response format", async () => {
    const inviteId = "buildonbase"

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            code: "buildonbase",
            approximate_member_count: 417420,
            approximate_presence_count: 23545,
          }),
      } as Response),
    )

    const response = await getDiscordInviteInfo(inviteId)

    expect(response.code).toBe(inviteId)
  })
})
