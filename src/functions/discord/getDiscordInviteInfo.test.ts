import {
  getDiscordInviteInfo,
  getDiscordInviteInfoSchema,
} from "@/functions/discord/getDiscordInviteInfo"
import { describe, expect, it } from "vitest"

describe("getDiscordInviteInfo function format tests", () => {
  it("should match the expected response format", async () => {
    const inviteId = "buildonbase"

    const response = await getDiscordInviteInfo(inviteId)

    const validationResult = getDiscordInviteInfoSchema.safeParse(response)

    expect(validationResult.success).toBe(true)
    if (!validationResult.success) {
      console.error("Validation errors:", validationResult.error.errors)
    }
  })
})
