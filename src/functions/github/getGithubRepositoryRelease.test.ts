import { getGithubRepositoryRelease } from "@/functions/github/getGithubRepositoryRelease"
import { describe, expect, it, vi } from "vitest"

describe("getGithubRepositoryRelease function format tests", () => {
  it("should match the expected response format", async () => {
    const organizationName = "base-org"
    const repositoryName = "node"

    const response = await getGithubRepositoryRelease(
      organizationName,
      repositoryName,
    )

    expect(response.id).toBeGreaterThan(0)
  })
})
