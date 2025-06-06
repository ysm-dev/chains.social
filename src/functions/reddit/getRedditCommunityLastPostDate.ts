import { ofetch } from "@/lib/ofetch"
import { getDocument } from "@/utils/getDocument"
import { memoize } from "@fxts/core"

export const getRedditCommunityLastPostDate = memoize(async (slug: string) => {
  const html = await ofetch(`https://reddit.com/r/${slug}/new`, {
    parseResponse: (txt) => txt,
  })

  const document = getDocument(html)

  const dateTag = document.querySelector("faceplate-timeago")
  if (!dateTag) {
    throw new Error("No first <faceplate-timeago> found")
  }

  const datetimeValue = dateTag.getAttribute("ts")
  if (!datetimeValue) {
    throw new Error("<faceplate-timeago> tag does not have a 'ts' attribute.")
  }

  return new Date(datetimeValue).toISOString()
})
