import { PROXY_URL } from "@/lib/env"
import { getDocument } from "@/utils/getDocument"
import { memoize } from "@fxts/core"
import { ofetch } from "ofetch"

export const getRedditCommunityMemberCount = memoize(async (slug: string) => {
  const html = await ofetch(`${PROXY_URL}/https://reddit.com/r/${slug}`, {
    parseResponse: (txt) => txt,
  })

  const document = getDocument(html)

  const targetH1 = Array.from(document.querySelectorAll("h1")).find(
    (h1) => h1.textContent.trim() === `r/${slug}`,
  )

  if (!targetH1 || !targetH1.parentElement) {
    throw new Error('No <h1> tag with "r/solana" found.')
  }

  const siblingWithMembers = Array.from(targetH1.parentElement.children).find(
    (sibling) =>
      sibling !== targetH1 && sibling.textContent.includes("members"),
  )

  if (!siblingWithMembers) {
    throw new Error('No sibling with "members" in its content found.')
  }

  const faceplateTag = siblingWithMembers.querySelector("faceplate-number")

  if (!faceplateTag) {
    throw new Error("No <faceplate-number> tag found in the sibling.")
  }

  const memberCount = faceplateTag.getAttribute("number")

  return +memberCount
})
