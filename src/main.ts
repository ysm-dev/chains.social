import "dotenv/config"

import { getDiscordMemberCount } from "@/functions/getDiscordMemberCount"
import { storage } from "@/lib/unstorage"
import { isLocal } from "@/utils/isLocal"

async function main() {
  const discordLink = "https://discord.gg/buildonbase"
  const { memberCount, onlineCount } = await getDiscordMemberCount(discordLink)

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
