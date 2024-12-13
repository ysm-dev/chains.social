import { getOpenIssueCountFromGithub } from "@/functions/github/getOpenIssueCountFromGithub"
import { describe, expect, it } from "vitest"

describe("getOpenIssueCountFromGithub", () => {
  it("bitcoin", async () => {
    const githubRepositoryUrl = "https://github.com/bitcoin/bitcoin"

    const response = await getOpenIssueCountFromGithub(githubRepositoryUrl)

    expect(response).toBeGreaterThan(0)
  })
})
