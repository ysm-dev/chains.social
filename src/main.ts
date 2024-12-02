import { getFollowerCountFromGithub } from "@/functions/getFollowerCountFromGithub"
import { getMemberCountFromDiscord } from "@/functions/getMemberCountFromDiscord"
import { getOnlineCountFromDiscord } from "@/functions/getOnlineCountFromDiscord"
import { getPublicRepositoryCountFromGithub } from "@/functions/getPublicRepositoryCountFromGithub"
import { storage } from "@/lib/unstorage"
import { isLocal } from "@/utils/isLocal"
import { concurrent, pipe, toArray, toAsync } from "@fxts/core"
import "dotenv/config"

async function main() {
  const data = {
    discoardLink: "https://discord.gg/buildonbase",
    githubOrganizationLink: "https://github.com/base-org",
  }

  const [memberCount, onlineCount, followerCount, publicRepositoryCount] =
    await pipe(
      [
        getMemberCountFromDiscord(data.discoardLink),
        getOnlineCountFromDiscord(data.discoardLink),
        getFollowerCountFromGithub(data.githubOrganizationLink),
        getPublicRepositoryCountFromGithub(data.githubOrganizationLink),
      ],
      toAsync,
      concurrent(10000),
      toArray,
    )

  console.log(`Member count: ${memberCount}`)
  console.log(`Online count: ${onlineCount}`)

  const timestamp = Date.now()

  const discordFolder = `${isLocal() ? "tmp" : "base"}/${timestamp}/discord.json`

  await storage.set(discordFolder, {
    memberCount,
    onlineCount,
  })

  const githubFolder = `${isLocal() ? "tmp" : "base"}/${timestamp}/github.json`
  await storage.set(githubFolder, {
    followerCount,
    publicRepositoryCount,
  })
}

main()
  .catch(console.error)
  .finally(() => process.exit())
