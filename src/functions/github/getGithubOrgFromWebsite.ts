import { getDocument } from "@/utils/getDocument"
import { filter, map, pipe, toArray, uniq } from "@fxts/core"
import { ofetch } from "ofetch"

export const getGithubOrgFromWebsite = async (url: string) => {
  const html = await ofetch<string>(url, { parseResponse: (txt) => txt })

  const document = getDocument(html)

  const githubLinks = pipe(
    Array.from(document.querySelectorAll("a")),
    map((a) => a.href),
    filter((url) => url.includes("github.com")),
    map((url) => (url.startsWith("//") ? `https:${url}` : url)),
    // remove query params
    map((url) => url.split("?")[0]),
    // remove trailing slash with regex
    map((url) => url.replace(/\/$/, "")),
    // pathanme split '/' length should be 2 or 3
    filter(
      (url) =>
        new URL(url).pathname.split("/").length === 2 ||
        new URL(url).pathname.split("/").length === 3,
    ),
    // remove repo name if present (https://github.com/a/b -> https://github.com/a)
    map((url) =>
      new URL(url).pathname.split("/").length === 3
        ? new URL(url).origin +
          new URL(url).pathname.split("/").slice(0, 2).join("/")
        : url,
    ),
    uniq,
    toArray,
  )

  if (githubLinks.length === 0) {
    return null
  }

  return githubLinks[0]
}
