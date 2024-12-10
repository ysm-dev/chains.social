import { getGithubOrgFromWebsite } from "@/functions/github/getGithubOrgFromWebsite"
import { concurrent, map, pipe, toArray, toAsync } from "@fxts/core"
import { describe, expect, it } from "vitest"

const tests = [
  {
    website: "ethereum.org",
    expected: `/ethereum`,
  },
  {
    website: "internetcomputer.org",
    expected: `/dfinity`,
  },
  {
    website: "thegraph.com",
    expected: `/graphprotocol`,
  },
  {
    website: "sui.io",
    expected: `/MystenLabs`,
  },
  {
    website: "aptoslabs.com",
    expected: `/aptos-labs`,
  },
  {
    website: "ton.org",
    expected: "/ton-blockchain",
  },
  {
    website: "tron.network",
    expected: "/tronprotocol",
  },
  {
    website: "solana.com",
    expected: null,
  },
  {
    website: "optimism.io",
    expected: "/ethereum-optimism",
  },
  {
    website: "near.org",
    expected: "/near",
  },
]

describe.concurrent("getGithubOrgFromWebsite", async () => {
  it("getGithubOrgFromWebsite", async () => {
    const results = await pipe(
      tests,
      map(({ website }) => `https://${website}`),
      toAsync,
      map(getGithubOrgFromWebsite),
      concurrent(tests.length),
      toArray,
    )

    expect(results).toStrictEqual(
      tests.map(({ expected }) =>
        expected ? `https://github.com${expected}` : null,
      ),
    )
  })
})
