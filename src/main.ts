import "dotenv/config"

import { getMemberCountFromDiscord } from "@/functions/discord/getMemberCountFromDiscord"
import { getOnlineCountFromDiscord } from "@/functions/discord/getOnlineCountFromDiscord"
import { getClosedIssueCountFromGithub } from "@/functions/github/getClosedIssueCountFromGithub"
import { getClosedPRCountFromGithub } from "@/functions/github/getClosedPRCountFromGithub"
import { getCommitByBotCountFromGithub } from "@/functions/github/getCommitByBotCountFromGithub"
import { getCommitByUserCountFromGithub } from "@/functions/github/getCommitByUserCountFromGithub"
import { getContributorCountFromGithub } from "@/functions/github/getContributorCountFromGithub"
import { getFollowerCountFromGithub } from "@/functions/github/getFollowerCountFromGithub"
import { getForkCountFromGithub } from "@/functions/github/getForkCountFromGithub"
import { getLastCommitDateFromGithub } from "@/functions/github/getLastCommitDateFromGithub"
import { getLatestReleaseDateFromGithub } from "@/functions/github/getLatestReleaseDateFromGithub"
import { getLatestReleaseNameFromGithub } from "@/functions/github/getLatestReleaseNameFromGithub"
import { getOpenIssueCountFromGithub } from "@/functions/github/getOpenIssueCountFromGithub"
import { getOpenPRCountFromGithub } from "@/functions/github/getOpenPRCountFromGithub"
import { getPublicRepositoryCountFromGithub } from "@/functions/github/getPublicRepositoryCountFromGithub"
import { getStarCountFromGithub } from "@/functions/github/getStarCountFromGithub"
import { getTotalIssueCountFromGithub } from "@/functions/github/getTotalIssueCountFromGithub"
import { getTotalPRCountFromGithub } from "@/functions/github/getTotalPRCountFromGithub"
import { getWatcherCountFromGithub } from "@/functions/github/getWatcherCountFromGithub"
import { getLastDayDownloadCountFromNpm } from "@/functions/npm/getLastDayDownloadCountFromNpm"
import { getLastReleaseDateFromNpm } from "@/functions/npm/getLastReleaseDateFromNpm"
import { getLastReleaseVersionFromNpm } from "@/functions/npm/getLastReleaseVersionFromNpm"
import { getLastWeekDownloadCountFromNpm } from "@/functions/npm/getLastWeekDownloadCountFromNpm"
import { getLastPostDateFromReddit } from "@/functions/reddit/getLastPostDateFromReddit"
import { getMemberCountFromReddit } from "@/functions/reddit/getMemberCountFromReddit"
import { getGlobalWebsiteRankFromSim } from "@/functions/sim/getGlobalWebsiteRankFromSim"
import { getMonthlyWebsiteVisitorCountFromSim } from "@/functions/sim/getMonthlyWebsiteVisitorCountFromSim"
import { getWebsiteTopCountrySharesFromSim } from "@/functions/sim/getWebsiteTopCountrySharesFromSim"
import { getMemberCountFromTelegram } from "@/functions/telegram/getMemberCountFromTelegram"
import { getOnlineCountFromTelegram } from "@/functions/telegram/getOnlineCountFromTelegram"
import { getChannelFollowerCountFromWarpcast } from "@/functions/warpcast/getChannelFollowerCountFromWarpcast"
import { getChannelFollowingCountFromWarpcast } from "@/functions/warpcast/getChannelFollowingCountFromWarpcast"
import { getChannelLastCastDateFromWarpcast } from "@/functions/warpcast/getChannelLastCastDateFromWarpcast"
import { getFollowerCountFromWarpcast } from "@/functions/warpcast/getFollowerCountFromWarpcast"
import { getFollowingCountFromWarpcast } from "@/functions/warpcast/getFollowingCountFromWarpcast"
import { getLastCastDateFromWarpcast } from "@/functions/warpcast/getLastCastDateFromWarpcast"
import { getFollowerCountFromX } from "@/functions/x/getFollowerCountFromX"
import { getFollowingCountFromX } from "@/functions/x/getFollowingCountFromX"
import { getLastPostDateFromX } from "@/functions/x/getLastPostDateFromX"
import { getPostCountFromX } from "@/functions/x/getPostCountFromX"
import { getLastVideoDateFromYoutube } from "@/functions/youtube/getLastVideoDateFromYoutube"
import { getSubscriberCountFromYoutube } from "@/functions/youtube/getSubscriberCountFromYoutube"
import { getVideoCountFromYoutube } from "@/functions/youtube/getVideoCountFromYoutube"
import { getViewCountFromYoutube } from "@/functions/youtube/getViewCountFromYoutube"
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
    xLink: "https://x.com/solana",
    telegramLink: "https://t.me/solana",
    redditLink: "https://reddit.com/r/solana",
    warpcastLink: "https://warpcast.com/solana",
    wrapcastChannelLink: "https://warpcast.com/~/channel/solana",
    officialLink: "https://solana.com",
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
    lastWeekDownloadCount,
    lastDayDownloadCount,
    viewCount,
    videoCount,
    subscriberCount,
    xFollowerCount,
    xFollowingCount,
    telegramMemberCount,
    telegramOnlineCount,
    postCount,
    redditMemberCount,
    warpcastFollowerCount,
    warpcastFollowingCount,
    openPRCount,
    closedPRCount,
    totalPRCount,
    wrapcastChannelFollowerCount,
    wrapcastChannelFollowingCount,
    monthlyWebsiteVisitorCount,
    globalWebsiteRank,
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
      getLastWeekDownloadCountFromNpm(data.npmLink),
      getLastDayDownloadCountFromNpm(data.npmLink),
      getViewCountFromYoutube(data.youtubeLink),
      getVideoCountFromYoutube(data.youtubeLink),
      getSubscriberCountFromYoutube(data.youtubeLink),
      getFollowerCountFromX(data.xLink),
      getFollowingCountFromX(data.xLink),
      getMemberCountFromTelegram(data.telegramLink),
      getOnlineCountFromTelegram(data.telegramLink),
      getPostCountFromX(data.xLink),
      getMemberCountFromReddit(data.redditLink),
      getFollowerCountFromWarpcast(data.warpcastLink),
      getFollowingCountFromWarpcast(data.warpcastLink),
      getOpenPRCountFromGithub(data.githubRepositoryLink),
      getClosedPRCountFromGithub(data.githubRepositoryLink),
      getTotalPRCountFromGithub(data.githubRepositoryLink),
      getChannelFollowerCountFromWarpcast(data.wrapcastChannelLink),
      getChannelFollowingCountFromWarpcast(data.wrapcastChannelLink),
      getMonthlyWebsiteVisitorCountFromSim(data.officialLink),
      getGlobalWebsiteRankFromSim(data.officialLink),
    ],
    toAsync,
    concurrent(10000),
    toArray,
  )

  const [
    lastCommitDate,
    latestReleaseDate,
    latestReleaseName,
    lastReleaseDate,
    lastReleaseVersion,
    lastVideoDate,
    lastPostDate,
    redditLastPostDate,
    lastCastDate,
    channelLastCastDate,
  ] = await pipe(
    [
      getLastCommitDateFromGithub(data.githubRepositoryLink),
      getLatestReleaseDateFromGithub(data.githubRepositoryLink),
      getLatestReleaseNameFromGithub(data.githubRepositoryLink),
      getLastReleaseDateFromNpm(data.npmLink),
      getLastReleaseVersionFromNpm(data.npmLink),
      getLastVideoDateFromYoutube(data.youtubeLink),
      getLastPostDateFromX(data.xLink),
      getLastPostDateFromReddit(data.redditLink),
      getLastCastDateFromWarpcast(data.warpcastLink),
      getChannelLastCastDateFromWarpcast(data.wrapcastChannelLink),
    ],
    toAsync,
    concurrent(10000),
    toArray,
  )

  const websiteTopCountryShares = await getWebsiteTopCountrySharesFromSim(
    data.officialLink,
  )

  console.log(`Member count: ${memberCount}`)
  console.log(`Online count: ${onlineCount}`)

  const folder = `${isLocal() ? "tmp" : "base"}/${Date.now()}/data.json`

  await storage.set(folder, {
    website: {
      monthlyWebsiteVisitorCount,
      globalWebsiteRank,
      websiteTopCountryShares,
    },
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
      openPRCount,
      closedPRCount,
      totalPRCount,
    },
    npm: {
      lastDayDownloadCount,
      lastWeekDownloadCount,
      lastReleaseDate,
      lastReleaseVersion,
    },
    youtube: {
      viewCount,
      videoCount,
      subscriberCount,
      lastVideoDate,
    },
    x: {
      followerCount: xFollowerCount,
      followingCount: xFollowingCount,
      lastPostDate,
      postCount,
    },
    telegram: {
      memberCount: telegramMemberCount,
      onlineCount: telegramOnlineCount,
    },
    reddit: {
      memberCount: redditMemberCount,
      lastPostDate: redditLastPostDate,
    },
    warpcast: {
      followerCount: warpcastFollowerCount,
      followingCount: warpcastFollowingCount,
      lastCastDate,
      channelFollowerCount: wrapcastChannelFollowerCount,
      channelFollowingCount: wrapcastChannelFollowingCount,
      channelLastCastDate,
    },
  })
}

main()
  .catch(console.error)
  .finally(() => process.exit())
