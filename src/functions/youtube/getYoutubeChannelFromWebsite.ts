import { Window } from "happy-dom"

export const getYoutubeChannelFromWebsite = async (url: string) => {
  const res = await fetch(url)

  const html = await res.text()

  const window = new Window()
  const document = window.document

  document.body.innerHTML = html

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
