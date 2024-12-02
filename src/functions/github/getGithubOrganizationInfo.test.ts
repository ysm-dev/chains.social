import { getGithubOrganizationInfo } from "@/functions/github/getGithubOrganizationInfo"
import { describe, expect, it, vi } from "vitest"

describe("getGithubOrganizationInfo function format tests", () => {
  it("should match the expected response format", async () => {
    const organizationName = "base-org"

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            name: "Base",
            followers: 4339,
            public_repos: 121,
            type: "Organization",
          }),
      } as Response),
    )

    const response = await getGithubOrganizationInfo(organizationName)

    expect(response.followers).toBe(4339)
    expect(response.public_repos).toBe(121)
  })
})
