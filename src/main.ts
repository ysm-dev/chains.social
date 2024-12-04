import "dotenv/config"

import { getClosedIssueCountFromGithub } from "@/functions/getClosedIssueCountFromGithub"
import { getCommitByBotCountFromGithub } from "@/functions/getCommitByBotCountFromGithub"
import { getCommitByUserCountFromGithub } from "@/functions/getCommitByUserCountFromGithub"
import { getContributorCountFromGithub } from "@/functions/getContributorCountFromGithub"
import { getFollowerCountFromGithub } from "@/functions/getFollowerCountFromGithub"
import { getForkCountFromGithub } from "@/functions/getForkCountFromGithub"
import { getLastCommitDateFromGithub } from "@/functions/getLastCommitDateFromGithub"
import { getLastReleasedDateFromNpm } from "@/functions/getLastReleasedDateFromNpm"
import { getLastReleasedVersionromNpm } from "@/functions/getLastReleasedVersionFromNpm"
import { getLastWeekDownloadsFromNpm } from "@/functions/getLastWeekDownloadsFromNpm"
import { getLastVideoFromYoutube } from "@/functions/getLastVideoFromYoutube"
import { getLatestReleaseDateFromGithub } from "@/functions/getLatestReleaseDateFromGithub"
import { getLatestReleaseNameFromGithub } from "@/functions/getLatestReleaseNameFromGithub"
import { getMemberCountFromDiscord } from "@/functions/getMemberCountFromDiscord"
import { getOnlineCountFromDiscord } from "@/functions/getOnlineCountFromDiscord"
import { getOpenIssueCountFromGithub } from "@/functions/getOpenIssueCountFromGiyhub"
import { getPublicRepositoryCountFromGithub } from "@/functions/getPublicRepositoryCountFromGithub"
import { getStarCountFromGithub } from "@/functions/getStarCountFromGithub"
import { getSubscriberCountFromYoutube } from "@/functions/getSubscriberCountFromYoutube"
import { getTotalIssueCountFromGithub } from "@/functions/getTotalIssueCountFromGithub"
import { getVideoCountFromYoutube } from "@/functions/getVideoCountFromYoutube"
import { getViewCountFromYoutube } from "@/functions/getViewCountFromYoutube"
import { getWatcherCountFromGithub } from "@/functions/getWatcherCountFromGithub"
import { storage } from "@/lib/unstorage"
import { isLocal } from "@/utils/isLocal"
import { concurrent, pipe, toArray, toAsync } from "@fxts/core"

async function main() {
  const data = {
    discoardLink: "https://discord.gg/buildonbase",
    githubOrganizationLink: "https://github.com/base-org",
    githubRepositoryLink: "https://github.com/base-org/node",
    npmLink: "https://www.npmjs.com/package/@solana/web3.js",
    youtubeLink: "https://youtube.com/channel/UC9AdQPUe4BdVJ8M9X7wxHUA",
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
    lastWeekDownloads,
    viewCount,
    videoCount,
    subscriberCount,
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
      getLastWeekDownloadsFromNpm(data.npmLink),
      getViewCountFromYoutube(data.youtubeLink),
      getVideoCountFromYoutube(data.youtubeLink),
      getSubscriberCountFromYoutube(data.youtubeLink),
    ],
    toAsync,
    concurrent(10000),
    toArray,
  )

  const [
    lastCommitDate,
    latestReleaseDate,
    latestReleaseName,
    lastReleasedDate,
    lastReleasedVersion,
  ] = await pipe(
    [
      getLastCommitDateFromGithub(data.githubRepositoryLink),
      getLatestReleaseDateFromGithub(data.githubRepositoryLink),
      getLatestReleaseNameFromGithub(data.githubRepositoryLink),
      getLastReleasedDateFromNpm(data.npmLink),
      getLastReleasedVersionromNpm(data.npmLink),
    ],
    toAsync,
    concurrent(10000),
    toArray,
  )

  const lastVideo = await getLastVideoFromYoutube(data.youtubeLink)

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
      lastCommitDate,
      latestReleaseDate,
      latestReleaseName,
    },
    npm: {
      lastWeekDownloads,
      lastReleasedDate,
      lastReleasedVersion,
    },
    youtube: {
      viewCount,
      videoCount,
      subscriberCount,
      lastVideo,
    },
  })
}

main()
  .catch(console.error)
  .finally(() => process.exit())
