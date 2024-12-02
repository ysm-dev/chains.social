import { getMemberCountFromDiscord } from "@/functions/getMemberCountFromDiscord"
import {
  getGithubOrganizationInfo,
  getGithubOrganizationInfoSchema,
} from "@/functions/github/getGithubOrganizationInfo"
import { describe, expect, it } from "vitest"

describe("getGithubOrganizationInfo function format tests", () => {
  it("should match the expected response format", async () => {
    const organizationName = "base-org"

    const response = await getGithubOrganizationInfo(organizationName)

    const validationResult = getGithubOrganizationInfoSchema.safeParse(response)
    if (!validationResult.success) {
      console.error("Validation errors:", validationResult.error.errors)
    }

    expect(validationResult.success).toBe(true)
  })
})
