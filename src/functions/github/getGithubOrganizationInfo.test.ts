import { getGithubOrganizationInfo } from "@/functions/github/getGithubOrganizationInfo"
import { isLocal } from "@/utils/isLocal"
import { describe, expect, it, vi } from "vitest"

describe("getGithubOrganizationInfo function format tests", () => {
  it("should match the expected response format", async () => {
    const organizationName = "base-org"

    const response = await getGithubOrganizationInfo(organizationName)

    expect(response.login).toBe(organizationName)
  })
})
