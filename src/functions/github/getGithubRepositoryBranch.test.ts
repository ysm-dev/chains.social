import { getGithubRepositoryBranch } from "@/functions/github/getGithubRepositoryBranch"
import { describe, expect, it } from "vitest"

describe("getGithubRepositoryBranch function format tests", () => {
  it("should match the expected response format", async () => {
    const organizationName = "base-org"
    const repositoryName = "node"
    const defaultBranchName = "main"

    const response = await getGithubRepositoryBranch(
      organizationName,
      repositoryName,
      defaultBranchName,
    )

    expect(response.name).toBe(defaultBranchName)
  })
})
