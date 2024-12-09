import { getChainsSheet } from "@/lib/sheet"
import { describe, it } from "vitest"

describe("sheet lib", () => {
  it("getChainsSheet", async () => {
    await getChainsSheet()
  })
})
