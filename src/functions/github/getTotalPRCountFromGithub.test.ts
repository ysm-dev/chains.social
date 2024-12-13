import { getTotalPRCountFromGithub } from "@/functions/github/getTotalPRCountFromGithub"
import { describe, expect, it } from "vitest"

describe("getTotalPRCountFromGithub", () => {
  it("bitcoin", async () => {
    const githubRepositoryUrl = "https://github.com/bitcoin/bitcoin"

    const response = await getTotalPRCountFromGithub(githubRepositoryUrl)

    expect(response).toBeGreaterThan(0)
  })
})
