import { getGithubRepositoryContributors } from "@/functions/github/getGithubRepositoryContributors"
import { describe, expect, it } from "vitest"

describe("getGithubRepositoryContributors function format tests", () => {
  it("should match the expected response format", async () => {
    const organizationName = "base-org"
    const repositoryName = "node"

    const response = await getGithubRepositoryContributors(
      organizationName,
      repositoryName,
    )

    expect(response.commitByUserCount).toBeGreaterThanOrEqual(0)
    expect(response.commitByBotCount).toBeGreaterThanOrEqual(0)
    expect(response.contributorCount).toBeGreaterThanOrEqual(0)
  })
})
