import { getGithubRepositoryRelease } from "@/functions/github/getGithubRepositoryRelease"
import { describe, expect, it, vi } from "vitest"

describe("getGithubRepositoryRelease function format tests", () => {
  it("base", async () => {
    const organizationName = "base-org"
    const repositoryName = "node"

    const response = await getGithubRepositoryRelease(
      organizationName,
      repositoryName,
    )

    expect(response).toBeTruthy()
  })

  it("cardano", async () => {
    const organizationName = "cardano-foundation"
    const repositoryName = "CIPs"

    const response = await getGithubRepositoryRelease(
      organizationName,
      repositoryName,
    )

    expect(response).toBeNull()
  })
})
