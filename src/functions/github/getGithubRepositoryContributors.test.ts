import { getGithubRepositoryContributors } from "@/functions/github/getGithubRepositoryContributors"
import { describe, expect, it, vi } from "vitest"

describe("getGithubRepositoryContributors function format tests", () => {
  it("should match the expected response format", async () => {
    const organizationName = "base-org"
    const repositoryName = "node"

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve([
            {
              login: "asdf",
              contributions: 20,
            },
            {
              login: "qwer",
              contributions: 10,
            },
          ]),
      } as Response),
    )

    const response = await getGithubRepositoryContributors(
      organizationName,
      repositoryName,
    )

    expect(response.commitCount).toBeGreaterThan(0)
    expect(response.contributorCount).toBeGreaterThan(0)
  })
})
