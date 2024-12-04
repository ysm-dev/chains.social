import { filter, map, pipe, toArray, uniq } from "@fxts/core"
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

export const getGoogleSearchResult = async (query: string) => {
  const chromium = chrome.use(StealthPlugin())

  const browser = await chromium.launch({
    headless: true,
    devtools: false,
    timeout: ms("10m"),
  })

  const context = await browser.newContext(browserContext)

  const page = await context.newPage()

  await page.goto(`https://www.google.com/search?q=${query}`)

  await page.waitForSelector("h3")

  const hasFilter = query.startsWith("site:")

  const site = hasFilter ? query.split(" ")[0].slice(5) : ""

  const results: string[] = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a")).map((a) => a.href!),
  )

  await browser.close()

  return pipe(
    results,
    filter(URL.canParse),
    map((url) => new URL(url).searchParams.get("q")!),
    filter(URL.canParse),
    filter((url) => (hasFilter ? new URL(url).hostname.includes(site) : true)),
    uniq,
    toArray,
  )
}
