import { getYoutubeChannelFromWebsite } from "@/functions/youtube/getYoutubeChannelFromWebsite"
import { concurrent, map, pipe, toArray, toAsync } from "@fxts/core"
import { describe, expect, it } from "vitest"

const tests = [
  {
    website: "circle.com",
    expected: `/c/Circlecryptofinance`,
  },
  {
    website: "internetcomputer.org",
    expected: `/dfinity`,
  },
  {
    website: "thegraph.com",
    expected: `/c/GraphProtocol`,
  },
  {
    website: "sui.io",
    expected: `/@Sui-Network`,
  },
  {
    website: "www.starknet.io",
    expected: `/channel/UCnDWguR8mE2oDBsjhQkgbvg`,
  },
  {
    website: "ethereum.org",
    expected: null,
  },
  {
    website: "solana.com",
    expected: null,
  },
]

describe.concurrent("getYoutubeChannelFromWebsite", async () => {
  it("getYoutubeChannelFromWebsite", async () => {
    const results = await pipe(
      tests,
      map(({ website }) => `https://${website}`),
      toAsync,
      map(getYoutubeChannelFromWebsite),
      concurrent(tests.length),
      toArray,
    )

    expect(results).toStrictEqual(
      tests.map(({ expected }) =>
        expected ? `https://www.youtube.com${expected}` : null,
      ),
    )
  })
})
