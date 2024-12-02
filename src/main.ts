import "dotenv/config"

import { getMemberCountFromDiscord } from "@/functions/getMemberCountFromDiscord"
import { getOnlineCountFromDiscord } from "@/functions/getOnlineCountFromDiscord"
import { storage } from "@/lib/unstorage"
import { isLocal } from "@/utils/isLocal"
import { concurrent, pipe, toArray, toAsync } from "@fxts/core"

async function main() {
  const discordLink = "https://discord.gg/buildonbase"

  const [memberCount, onlineCount] = await pipe(
    [
      getMemberCountFromDiscord(discordLink),
      getOnlineCountFromDiscord(discordLink),
    ],
    toAsync,
    concurrent(10000),
    toArray,
  )

  console.log(`Member count: ${memberCount}`)
  console.log(`Online count: ${onlineCount}`)

  const folder = `${isLocal() ? "tmp" : "base"}/${Date.now()}/discord.json`

  await storage.set(folder, {
    memberCount,
    onlineCount,
  })
}

main()
  .catch(console.error)
  .finally(() => process.exit())
