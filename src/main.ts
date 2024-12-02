import { getDiscordMemberCount } from "@/functions/getDiscordMemberCount"
import { storage } from "@/lib/unstorage"

async function main() {
  const discordLink = "https://discord.gg/buildonbase"
  const { memberCount, onlineCount } = await getDiscordMemberCount(discordLink)

  console.log(`Member count: ${memberCount}`)
  console.log(`Online count: ${onlineCount}`)

  await storage.set(`base/${Date.now()}/discord.json`, {
    memberCount,
    onlineCount,
  })
}

main()
  .catch(console.error)
  .finally(() => process.exit())
