import { getDocument } from "@/utils/getDocument"
import { ofetch } from "ofetch"

export const getYoutubeChannelFromWebsite = async (url: string) => {
  const html = await ofetch(url, { parseResponse: (txt) => txt })

  const document = getDocument(html)

  const youtubeLinks = Array.from(document.querySelectorAll("a"))
    .map((a) => a.href)
    .filter((url) => url.includes("youtube.com"))
    // if start with //
    .map((url) => (url.startsWith("//") ? `https:${url}` : url))
    // filter out video url
    .filter((url) => !url.includes("/watch"))

  if (youtubeLinks.length === 0) {
    return null
  }

  return youtubeLinks[0]
}
