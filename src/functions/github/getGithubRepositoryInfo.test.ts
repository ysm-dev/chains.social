import { getGithubRepositoryInfo } from "@/functions/github/getGithubRepositoryInfo"
import { describe, expect, it, vi } from "vitest"

describe("getGithubRepositoryInfo function format tests", () => {
  it("should match the expected response format", async () => {
    const organizationName = "base-org"
    const repositoryName = "node"

    const response = await getGithubRepositoryInfo(
      organizationName,
      repositoryName,
    )

    expect(response.name).toBe(repositoryName)
    expect(response.full_name).toBe(`${organizationName}/${repositoryName}`)
  })
})
