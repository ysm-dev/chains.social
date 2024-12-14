import { getTotalIssueCountFromGithub } from "@/functions/github/getTotalIssueCountFromGithub"
import { describe, expect, it } from "vitest"

describe("getTotalIssueCountFromGithub", () => {
  it("bitcoin", async () => {
    const githubRepositoryUrl = "https://github.com/bitcoin/bitcoin"

    const response = await getTotalIssueCountFromGithub(githubRepositoryUrl)

    expect(response).toBeGreaterThan(0)
  })

  it("ton-blockchain", async () => {
    const githubRepositoryUrl = "https://github.com/ton-blockchain/ton"

    const response = await getTotalIssueCountFromGithub(githubRepositoryUrl)

    expect(response).toBeGreaterThan(0)
  })
})
