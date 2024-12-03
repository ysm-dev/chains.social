import { getGithubRepositoryIssues } from "@/functions/github/getGithubRepositoryIssues"
import { describe, expect, it, vi } from "vitest"

describe("getGithubIssues function format tests", () => {
  it("should match the expected response format", async () => {
    const organizationName = "base-org"
    const repositoryName = "node"

    const response = await getGithubRepositoryIssues(
      organizationName,
      repositoryName,
    )

    expect(response.totalIssueCount).toBeGreaterThan(0)
    expect(response.openIssueCount).toBeGreaterThan(0)
    expect(response.closedIssueCount).toBeGreaterThan(0)
  })
})
