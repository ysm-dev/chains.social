import { getPublicRepositoryCountFromGithub } from "@/functions/getPublicRepositoryCountFromGithub"
import { describe, expect, it } from "vitest"

describe("getPublicRepositoryCountFromGithub function format tests", () => {
  it("should match the expected response format", async () => {
    const githubOrganizationLink = "https://github.com/base-org"

    const response = await getPublicRepositoryCountFromGithub(
      githubOrganizationLink,
    )

    expect(response).toBeGreaterThan(0)
  })
})
