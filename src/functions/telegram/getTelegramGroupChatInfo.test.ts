import { getTelegramGroupChatInfo } from "@/functions/telegram/getTelegramGroupChatInfo"
import { describe, expect, it } from "vitest"

describe.concurrent("getTelegramGroupChatInfo", () => {
  it("solana group chat", async () => {
    const telegramSlug = "solana"

    const response = await getTelegramGroupChatInfo(telegramSlug)

    expect(response.memberCount).toBeGreaterThan(0)
    expect(response.onlineCount).toBeGreaterThan(0)
  })
})
