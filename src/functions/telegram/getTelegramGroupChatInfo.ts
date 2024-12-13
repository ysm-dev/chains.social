import { ofetch } from "@/lib/ofetch"
import { getDocument } from "@/utils/getDocument"
import { memoize } from "@fxts/core"

/*
  x-ratelimit-limit: none
  x-ratelimit-rest: none
*/
export const getTelegramGroupChatInfo = memoize(async (slug: string) => {
  const html = await ofetch(`https://t.me/${slug}`, {
    parseResponse: (txt) => txt,
  })

  const document = getDocument(html)

  const element = document.querySelector(".tgme_page_extra")
  if (!element) {
    throw new Error("Element not found")
  }

  if (element.textContent!.includes("online")) {
    const [members, online] = element.textContent!.split(", ")

    const memberCount = +members.replace(" members", "").replace(" ", "")
    const onlineCount = +online.replace(" online", "").replace(" ", "")

    return { memberCount, onlineCount }
  } else if (element.textContent!.includes("subscribers")) {
    const subscriberCount = +element
      .textContent!.replace(" subscribers", "")
      .replace(" ", "")

    return { subscriberCount }
  }

  throw new Error("Unknown type")
})
