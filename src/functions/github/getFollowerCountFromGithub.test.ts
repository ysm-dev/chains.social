import { getFollowerCountFromGithub } from "@/functions/github/getFollowerCountFromGithub"
import { describe, expect, it } from "vitest"

describe("getFollowerCountFromGithub function format tests", () => {
  it("should match the expected response format", async () => {
    const githubOrganizationLink = "https://github.com/base-org"

    const response = await getFollowerCountFromGithub(githubOrganizationLink)

    expect(response).toBeGreaterThan(0)
  })
})
