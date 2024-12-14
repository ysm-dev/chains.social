import { getGithubOrganizationInfo } from "@/functions/github/getGithubOrganizationInfo"
import { describe, expect, it, vi } from "vitest"

describe("getGithubOrganizationInfo", () => {
  it("base", async () => {
    const organizationName = "base-org"

    const response = await getGithubOrganizationInfo(organizationName)

    expect(response.login).toBe(organizationName)
  })

  it("bitcoin", async () => {
    const organizationName = "bitcoin"

    const response = await getGithubOrganizationInfo(organizationName)

    expect(response.login).toBe(organizationName)
  })
})
