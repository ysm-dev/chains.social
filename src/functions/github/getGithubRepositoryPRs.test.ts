import { getGithubRepositoryIssues } from "@/functions/github/getGithubRepositoryIssues"
import { getGithubRepositoryPRs } from "@/functions/github/getGithubRepositoryPRs"
import { getGithubRepositoryRelease } from "@/functions/github/getGithubRepositoryRelease"
import { describe, expect, it, vi } from "vitest"

describe("getGithubRepositoryPRs function format tests", () => {
  it("base", async () => {
    const organizationName = "base-org"
    const repositoryName = "node"

    const response = await getGithubRepositoryPRs(
      organizationName,
      repositoryName,
    )

    expect(response.totalPRCount).toBeGreaterThan(0)
  })
})
