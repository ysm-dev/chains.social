import { getChainsSheet } from "@/lib/getChainsSheet"
import { describe, it } from "vitest"

describe("sheet lib", () => {
  it("getChainsSheet", async () => {
    const response = await getChainsSheet()
  })
})
