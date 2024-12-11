import { memoize } from "@fxts/core"
import ms from "ms"
import { chromium as chrome } from "playwright-extra"
import type { BrowserContextOptions } from "playwright/test"
import StealthPlugin from "puppeteer-extra-plugin-stealth"

const browserContext: BrowserContextOptions = {
  colorScheme: "dark",
  viewport: {
    width: 1920,
    height: 1080,
  },
  locale: "en-US",
  ignoreHTTPSErrors: true,
  bypassCSP: true,
  reducedMotion: "reduce",
  javaScriptEnabled: false,
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
}

export const getRedditCommunityMemberCount = memoize(async (slug: string) => {
  const chromium = chrome.use(StealthPlugin())

  const browser = await chromium.launch({
    headless: true,
    devtools: false,
    timeout: ms("10m"),
  })

  const context = await browser.newContext(browserContext)

  const page = await context.newPage()

  await page.goto(`https://reddit.com/r/${slug}`)

  // h1 with "r/solana" text
  await page.waitForSelector("h1:has-text('r/solana')")

  const memberCount = await page.evaluate(() => {
    const targetH1 = Array.from(document.querySelectorAll("h1")).find(
      (h1) => h1.textContent?.trim() === "r/solana",
    )

    if (!targetH1 || !targetH1.parentElement) {
      throw new Error('No <h1> tag with "r/solana" found.')
    }

    const siblingWithMembers = Array.from(targetH1.parentElement.children).find(
      (sibling) =>
        sibling !== targetH1 && sibling.textContent?.includes("members"),
    )

    if (!siblingWithMembers) {
      throw new Error('No sibling with "members" in its content found.')
    }

    const faceplateTag = siblingWithMembers.querySelector("faceplate-number")

    if (!faceplateTag) {
      throw new Error("No <faceplate-number> tag found in the sibling.")
    }

    return faceplateTag.getAttribute("number")
  })

  if (!memberCount) {
    throw new Error("No member count found.")
  }

  return +memberCount
})
