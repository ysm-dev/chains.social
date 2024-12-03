import { getNpmLastWeekDownloads } from "@/functions/npm/getNpmLastWeekDownloads"
import { getNpmPackageInfo } from "@/functions/npm/getNpmPackageInfo"
import { describe, expect, it, vi } from "vitest"

describe("getNpmPackageInfo function format tests", () => {
  it("should match the expected response format", async () => {
    const packageName = "@solana/web3.js"

    const response = await getNpmPackageInfo(packageName)

    expect(response.name).toBe(packageName)
  })
})
