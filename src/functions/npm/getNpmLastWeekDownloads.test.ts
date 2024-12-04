import { getNpmLastWeekDownloads } from "@/functions/npm/getNpmLastWeekDownloads"
import { describe, expect, it, vi } from "vitest"

describe("getNpmLastWeekDownloads function format tests", () => {
  it("should match the expected response format", async () => {
    const packageName = "@solana/web3.js"

    const response = await getNpmLastWeekDownloads(packageName)

    expect(response.package).toBe(packageName)
  })
})
