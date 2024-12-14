import { getPublicRepositoryCountFromGithub } from "@/functions/github/getPublicRepositoryCountFromGithub"
import { describe, expect, it } from "vitest"

describe("getPublicRepositoryCountFromGithub", () => {
  it("base", async () => {
    const githubOrganizationUrl = "https://github.com/base-org"

    const response = await getPublicRepositoryCountFromGithub(
      githubOrganizationUrl,
    )

    expect(response).toBeGreaterThan(0)
  })
})
