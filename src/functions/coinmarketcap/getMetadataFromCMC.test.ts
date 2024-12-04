import { getMetadataFromCMC } from "@/functions/coinmarketcap/getMetadataFromCMC"
import { describe, expect, it } from "vitest"

describe.concurrent("getMetadataFromCMC", () => {
  it("bitcoin", async () => {
    const cmcSlug = "bitcoin"

    const response = await getMetadataFromCMC(cmcSlug)

    const expected = {
      id: 1,
      name: "Bitcoin",
      slug: "bitcoin",
      symbol: "BTC",
      launchDate: "2010-07-13T00:00:00.000Z",
      website: "https://bitcoin.org",
      x: null,
      githubRepo: "https://github.com/bitcoin/bitcoin",
      githubOrg: null,
      reddit: "https://reddit.com/r/bitcoin",
      telegram: null,
      discord: null,
    }

    expect(response).toEqual(expected)
  })

  it("ethereum", async () => {
    const cmcSlug = "ethereum"

    const response = await getMetadataFromCMC(cmcSlug)

    const expected = {
      id: 1027,
      name: "Ethereum",
      slug: "ethereum",
      symbol: "ETH",
      launchDate: null,
      website: "https://www.ethereum.org",
      x: "https://x.com/ethereum",
      githubRepo: "https://github.com/ethereum/go-ethereum",
      githubOrg: null,
      reddit: "https://reddit.com/r/ethereum",
      telegram: null,
      discord: null,
    }

    expect(response).toEqual(expected)
  })

  it("solana", async () => {
    const cmcSlug = "solana"

    const response = await getMetadataFromCMC(cmcSlug)

    const expected = {
      id: 5426,
      name: "Solana",
      slug: "solana",
      symbol: "SOL",
      launchDate: "2020-03-16T00:00:00.000Z",
      website: "https://solana.com",
      x: "https://x.com/solana",
      githubRepo: null,
      githubOrg: "https://github.com/solana-labs",
      reddit: "https://reddit.com/r/solana",
      telegram: "https://t.me/solana",
      discord: "https://solana.com/discord",
    }

    expect(response).toEqual(expected)
  })
})
