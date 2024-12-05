import { memoize } from "@fxts/core"
import { Window } from "happy-dom"

export const getTelegramGroupChatInfo = memoize(async (slug: string) => {
  const html = await fetch(`https://t.me/${slug}`).then((res) => res.text())

  const window = new Window()
  const document = window.document

  document.body.innerHTML = html

  const element = document.querySelector(".tgme_page_extra")
  if (!element) {
    throw new Error("Element not found")
  }

  const [members, online] = element.textContent!.split(", ")

  const memberCount = +members.replace(" members", "").replace(" ", "")
  const onlineCount = +online.replace(" online", "").replace(" ", "")

  return { memberCount, onlineCount }
})
