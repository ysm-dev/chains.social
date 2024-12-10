import { getDocument } from "@/utils/getDocument"
import { memoize } from "@fxts/core"
import { ofetch } from "ofetch"

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

  const [members, online] = element.textContent!.split(", ")

  const memberCount = +members.replace(" members", "").replace(" ", "")
  const onlineCount = +online.replace(" online", "").replace(" ", "")

  return { memberCount, onlineCount }
})
