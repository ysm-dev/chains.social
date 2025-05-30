import { getGoogleSearchResult } from "@/functions/google/getGoogleSearchResult"
import { describe, expect, it } from "vitest"

describe.skip.concurrent("getGoogleSearchResult", () => {
  it("site:youtube.com Solana", async () => {
    const query = "site:youtube.com Solana"

    const result = await getGoogleSearchResult(query)

    const channel = `https://www.youtube.com/@SolanaFndn`

    expect(result.includes(channel)).toEqual(true)
    expect(result.length).toEqual(99)
  })

  it("site:youtube.com Ethereum", async () => {
    const query = "site:youtube.com Ethereum"

    const result = await getGoogleSearchResult(query)

    const channel = `https://www.youtube.com/@EthereumProtocol`

    expect(result.includes(channel)).toEqual(true)
    expect(result.length).toEqual(99)
  })
})
