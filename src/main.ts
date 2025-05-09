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
import { getChainsSheet } from "@/lib/getChainsSheet"
import { storage } from "@/lib/unstorage"
import { isLocal } from "@/utils/isLocal"
import { concurrent, drop, map, pipe, take, toArray, toAsync } from "@fxts/core"

async function main() {
  const chains = await getChainsSheet()

  const result = await pipe(
    chains,
    toAsync,
    map(async (data) => {
      console.log(JSON.stringify(data, null, 2))

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
          data.discordUrl
            ? getMemberCountFromDiscord(data.discordUrl)
            : Promise.resolve(null),
          data.discordUrl
            ? getOnlineCountFromDiscord(data.discordUrl)
            : Promise.resolve(null),
          data.gitHubOrganizationUrl
            ? getFollowerCountFromGithub(data.gitHubOrganizationUrl)
            : Promise.resolve(null),
          data.gitHubOrganizationUrl
            ? getPublicRepositoryCountFromGithub(data.gitHubOrganizationUrl)
            : Promise.resolve(null),
          data.gitHubRepositoryUrl
            ? getStarCountFromGithub(data.gitHubRepositoryUrl)
            : Promise.resolve(null),
          data.gitHubRepositoryUrl
            ? getForkCountFromGithub(data.gitHubRepositoryUrl)
            : Promise.resolve(null),
          data.gitHubRepositoryUrl
            ? getWatcherCountFromGithub(data.gitHubRepositoryUrl)
            : Promise.resolve(null),
          data.gitHubRepositoryUrl
            ? getCommitByUserCountFromGithub(data.gitHubRepositoryUrl)
            : Promise.resolve(null),
          data.gitHubRepositoryUrl
            ? getCommitByBotCountFromGithub(data.gitHubRepositoryUrl)
            : Promise.resolve(null),
          data.gitHubRepositoryUrl
            ? getContributorCountFromGithub(data.gitHubRepositoryUrl)
            : Promise.resolve(null),
          data.gitHubRepositoryUrl
            ? getTotalIssueCountFromGithub(data.gitHubRepositoryUrl)
            : Promise.resolve(null),
          data.gitHubRepositoryUrl
            ? getOpenIssueCountFromGithub(data.gitHubRepositoryUrl)
            : Promise.resolve(null),
          data.gitHubRepositoryUrl
            ? getClosedIssueCountFromGithub(data.gitHubRepositoryUrl)
            : Promise.resolve(null),
          data.npmUrl
            ? getLastWeekDownloadCountFromNpm(data.npmUrl)
            : Promise.resolve(null),
          data.npmUrl
            ? getLastDayDownloadCountFromNpm(data.npmUrl)
            : Promise.resolve(null),
          data.youtubeChannelId
            ? getViewCountFromYoutube(data.youtubeChannelId)
            : Promise.resolve(null),
          data.youtubeChannelId
            ? getVideoCountFromYoutube(data.youtubeChannelId)
            : Promise.resolve(null),
          data.youtubeChannelId
            ? getSubscriberCountFromYoutube(data.youtubeChannelId)
            : Promise.resolve(null),
          data.xUrl ? getFollowerCountFromX(data.xUrl) : Promise.resolve(null),
          data.xUrl ? getFollowingCountFromX(data.xUrl) : Promise.resolve(null),
          data.telegramUrl
            ? getMemberCountFromTelegram(data.telegramUrl)
            : Promise.resolve(null),
          data.telegramUrl
            ? getOnlineCountFromTelegram(data.telegramUrl)
            : Promise.resolve(null),
          data.xUrl ? getPostCountFromX(data.xUrl) : Promise.resolve(null),
          data.redditUrl
            ? getMemberCountFromReddit(data.redditUrl)
            : Promise.resolve(null),
          data.warpcastProfileUrl
            ? getFollowerCountFromWarpcast(data.warpcastProfileUrl)
            : Promise.resolve(null),
          data.warpcastProfileUrl
            ? getFollowingCountFromWarpcast(data.warpcastProfileUrl)
            : Promise.resolve(null),
          data.gitHubRepositoryUrl
            ? getOpenPRCountFromGithub(data.gitHubRepositoryUrl)
            : Promise.resolve(null),
          data.gitHubRepositoryUrl
            ? getClosedPRCountFromGithub(data.gitHubRepositoryUrl)
            : Promise.resolve(null),
          data.gitHubRepositoryUrl
            ? getTotalPRCountFromGithub(data.gitHubRepositoryUrl)
            : Promise.resolve(null),
          data.warpcastChannelUrl
            ? getChannelFollowerCountFromWarpcast(data.warpcastChannelUrl)
            : Promise.resolve(null),
          data.warpcastChannelUrl
            ? getChannelFollowingCountFromWarpcast(data.warpcastChannelUrl)
            : Promise.resolve(null),
          data.websiteUrl
            ? getMonthlyWebsiteVisitorCountFromSim(data.websiteUrl)
            : Promise.resolve(null),
          data.websiteUrl
            ? getGlobalWebsiteRankFromSim(data.websiteUrl)
            : Promise.resolve(null),
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
          data.gitHubRepositoryUrl
            ? getLastCommitDateFromGithub(data.gitHubRepositoryUrl)
            : Promise.resolve(null),
          data.gitHubRepositoryUrl
            ? getLatestReleaseDateFromGithub(data.gitHubRepositoryUrl)
            : Promise.resolve(null),
          data.gitHubRepositoryUrl
            ? getLatestReleaseNameFromGithub(data.gitHubRepositoryUrl)
            : Promise.resolve(null),
          data.npmUrl
            ? getLastReleaseDateFromNpm(data.npmUrl)
            : Promise.resolve(null),

          data.npmUrl
            ? getLastReleaseVersionFromNpm(data.npmUrl)
            : Promise.resolve(null),
          data.youtubeChannelId
            ? getLastVideoDateFromYoutube(data.youtubeChannelId)
            : Promise.resolve(null),
          data.xUrl ? getLastPostDateFromX(data.xUrl) : Promise.resolve(null),
          data.redditUrl
            ? getLastPostDateFromReddit(data.redditUrl)
            : Promise.resolve(null),
          data.warpcastProfileUrl
            ? getLastCastDateFromWarpcast(data.warpcastProfileUrl)
            : Promise.resolve(null),
          data.warpcastChannelUrl
            ? getChannelLastCastDateFromWarpcast(data.warpcastChannelUrl)
            : Promise.resolve(null),
        ],
        toAsync,
        concurrent(10000),
        toArray,
      )

      const websiteTopCountryShares = data.websiteUrl
        ? await getWebsiteTopCountrySharesFromSim(data.websiteUrl)
        : null

      return {
        chainSlug: data.slug,

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
      }
    }),
    toArray,
  )

  const folder = `${isLocal() ? "tmp" : "base"}/${Date.now()}/data.json`
  await storage.set(folder, result)
}

main()
  .catch(console.error)
  .finally(() => process.exit())
