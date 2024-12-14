import { getFollowerCountFromGithub } from "@/functions/github/getFollowerCountFromGithub"
import { describe, expect, it } from "vitest"

describe("getFollowerCountFromGithub", () => {
  it("base", async () => {
    const githubOrganizationUrl = "https://github.com/base-org"

    const response = await getFollowerCountFromGithub(githubOrganizationUrl)

    expect(response).toBeGreaterThan(0)
  })
})
