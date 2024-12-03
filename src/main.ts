import "dotenv/config"

import { getClosedIssueCountFromGithub } from "@/functions/getClosedIssueCountFromGithub"
import { getCommitByBotCountFromGithub } from "@/functions/getCommitByBotCountFromGithub"
import { getCommitByUserCountFromGithub } from "@/functions/getCommitByUserCountFromGithub"
import { getContributorCountFromGithub } from "@/functions/getContributorCountFromGithub"
import { getFollowerCountFromGithub } from "@/functions/getFollowerCountFromGithub"
import { getForkCountFromGithub } from "@/functions/getForkCountFromGithub"
import { getMemberCountFromDiscord } from "@/functions/getMemberCountFromDiscord"
import { getOnlineCountFromDiscord } from "@/functions/getOnlineCountFromDiscord"
import { getOpenIssueCountFromGithub } from "@/functions/getOpenIssueCountFromGiyhub"
import { getPublicRepositoryCountFromGithub } from "@/functions/getPublicRepositoryCountFromGithub"
import { getStarCountFromGithub } from "@/functions/getStarCountFromGithub"
import { getTotalIssueCountFromGithub } from "@/functions/getTotalIssueCountFromGithub"
import { getWatcherCountFromGithub } from "@/functions/getWatcherCountFromGithub"
import { storage } from "@/lib/unstorage"
import { isLocal } from "@/utils/isLocal"
import { concurrent, pipe, toArray, toAsync } from "@fxts/core"

async function main() {
  const data = {
    discoardLink: "https://discord.gg/buildonbase",
    githubOrganizationLink: "https://github.com/base-org",
    githubRepositoryLink: "https://github.com/base-org/node",
  }

  const [
    memberCount,
    onlineCount,
    followerCount,
    publicRepositoryCount,
    starCount,
    forkCount,
    watcherCount,
    commitByUserCount,
    commitByBotCount,
    contributorCount,
    totalIssueCount,
    openIssueCount,
    closedIssueCount,
  ] = await pipe(
    [
      getMemberCountFromDiscord(data.discoardLink),
      getOnlineCountFromDiscord(data.discoardLink),
      getFollowerCountFromGithub(data.githubOrganizationLink),
      getPublicRepositoryCountFromGithub(data.githubOrganizationLink),
      getStarCountFromGithub(data.githubRepositoryLink),
      getForkCountFromGithub(data.githubRepositoryLink),
      getWatcherCountFromGithub(data.githubRepositoryLink),
      getCommitByUserCountFromGithub(data.githubRepositoryLink),
      getCommitByBotCountFromGithub(data.githubRepositoryLink),
      getContributorCountFromGithub(data.githubRepositoryLink),
      getTotalIssueCountFromGithub(data.githubRepositoryLink),
      getOpenIssueCountFromGithub(data.githubRepositoryLink),
      getClosedIssueCountFromGithub(data.githubRepositoryLink),
    ],
    toAsync,
    concurrent(10000),
    toArray,
  )

  console.log(`Member count: ${memberCount}`)
  console.log(`Online count: ${onlineCount}`)

  const folder = `${isLocal() ? "tmp" : "base"}/${Date.now()}/data.json`

  await storage.set(folder, {
    discord: {
      memberCount,
      onlineCount,
    },
    github: {
      followerCount,
      publicRepositoryCount,
      starCount,
      forkCount,
      watcherCount,
      commitByUserCount,
      commitByBotCount,
      contributorCount,
      totalIssueCount,
      openIssueCount,
      closedIssueCount,
    },
  })
}

main()
  .catch(console.error)
  .finally(() => process.exit())
