import { getXUserTweets } from "@/functions/x/getXUserTweets"
import { last } from "@fxts/core"
import { describe, expect, it } from "vitest"

describe("getXUserTweets function format tests", () => {
  it("solana", async () => {
    const userId = "951329744804392960"

    const { lastTweetDate } = await getXUserTweets(userId)

    // check if date is in ISO format
    expect(lastTweetDate).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
    )
  })

  it("aptos", async () => {
    const userId = "1582127706560376832"

    const { lastTweetDate } = await getXUserTweets(userId)

    expect(lastTweetDate).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
    )
  })

  it("sui", async () => {
    const userId = "1428872926363754497"

    const { lastTweetDate } = await getXUserTweets(userId)

    expect(lastTweetDate).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
    )
  })
})
