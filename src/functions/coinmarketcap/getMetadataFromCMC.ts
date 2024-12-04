import { githubOrgURLSchema, githubRepoURLSchema } from "@/validators/github"
import { subredditURLSchema } from "@/validators/reddit"
import { telegramURLSchema } from "@/validators/telegram"
import { filter, first, pipe } from "@fxts/core"
import { destr } from "destr"
import { Window } from "happy-dom"

export const getMetadataFromCMC = async (slug: string) => {
  const html = await fetch(`https://coinmarketcap.com/currencies/${slug}`).then(
    (res) => res.text(),
  )

  const window = new Window()
  const document = window.document

  document.body.innerHTML = html

  const json = destr<R>(document.getElementById("__NEXT_DATA__")!.textContent)

  const props = json.props.pageProps

  const detail = props.detailRes.detail

  const urls = detail.urls

  const id = detail.id

  const name = detail.name

  const symbol = detail.symbol

  const launchDate = detail.dateLaunched || null

  const website = urls.website?.[0] || null

  const x = urls.twitter?.[0]?.replace("twitter.com", "x.com") || null

  const githubRepo =
    pipe(
      urls.source_code || [],
      filter((url) => githubRepoURLSchema.safeParse(url).success),
      first,
    ) || null

  const githubOrg =
    pipe(
      urls.source_code || [],
      filter((url) => githubOrgURLSchema.safeParse(url).success),
      first,
    ) || null

  const reddit =
    pipe(
      urls.reddit || [],
      filter((url) => subredditURLSchema.safeParse(url).success),
      first,
    ) || null

  const telegram =
    pipe(
      urls.chat || [],
      filter(
        (url) =>
          telegramURLSchema.safeParse(url).success || url.includes("telegram"),
      ),
      first,
    ) || null

  const discord =
    urls.chat?.find(
      (url) =>
        new URL(url).hostname === "discord.com" ||
        new URL(url).pathname.includes("discord"),
    ) || null

  const r = {
    id,
    name,
    slug,
    symbol,
    launchDate,
    website,
    x,
    githubRepo,
    githubOrg,
    reddit,
    telegram,
    discord,
  }

  // console.log(r)

  return r
}

export interface R {
  props: Props
  page: string
  query: RQuery
  buildId: string
  assetPrefix: string
  isFallback: boolean
  isExperimentalCompile: boolean
  gip: boolean
  appGip: boolean
  scriptLoader: any[]
}

export interface Props {
  initialI18nStore: InitialI18NStore
  initialLanguage: string
  i18nServerInstance: null
  pageProps: PageProps
  theme: string
  dehydratedState: DehydratedState
  quotesLatestData: QuotesLatestDatum[]
  initialState: string
}

export interface DehydratedState {
  mutations: any[]
  queries: QueryElement[]
}

export interface QueryElement {
  state: State
  queryKey: string[]
  queryHash: string
}

export interface State {
  data: GlobalMetrics
  dataUpdateCount: number
  dataUpdatedAt: number
  error: null
  errorUpdateCount: number
  errorUpdatedAt: number
  fetchFailureCount: number
  fetchMeta: null
  isFetching: boolean
  isInvalidated: boolean
  isPaused: boolean
  status: string
}

export interface GlobalMetrics {
  numCryptocurrencies: number
  numMarkets: number
  activeExchanges: number
  marketCap: number
  marketCapChange: number
  totalVol: number
  stablecoinVol: number
  stablecoinChange: number
  totalVolChange: number
  defiVol: number
  defiChange: number
  defiMarketCap: number
  derivativesVol: number
  derivativeChange: number
  btcDominance: number
  btcDominanceChange: number
  ethDominance: number
  etherscanGas: EtherscanGas
}

export interface EtherscanGas {
  lastBlock: string
  slowPrice: string
  slowPriceDecimal: number
  slowConfirmationTime: string
  standardPrice: string
  standardPriceDecimal: number
  standardConfirmationTime: string
  fastPrice: string
  fastPriceDecimal: number
  fastConfirmationTime: string
}

export interface InitialI18NStore {
  en: En
}

export interface En {
  page_cdp_common: PageCDPCommon
  "coin-detail-page": CoinDetailPage
  "gravity-post": CommunityEditor
  "community-editor": CommunityEditor
  gravity: CommunityEditor
  portfolio: Portfolio
  sheet_CDP: { [key: string]: string }
  sheet_AirdropDiamonds: { [key: string]: string }
  "sheet_BTC Historical Data": SheetBTCHistoricalData
  sheet_Cryptocurrencies: SheetCryptocurrencies
  "sheet_Coin sugguestion engine": SheetCoinSugguestionEngine
  sheet_TokenUnlocks: SheetTokenUnlocks
  sheet_NFT: { [key: string]: string }
  sheet_Yield: { [key: string]: string }
  sheet_News: SheetNews
  "sheet_CDP Community": CommunityEditor
  sheet_common: { [key: string]: string }
  "sheet_Watchlist Dropdown": CommunityEditor
  empty: CommunityEditor
}

export interface CoinDetailPage {
  "Please wait, we are loading chart data ": string
  "More news on the way, please stay tuned...": string
  "***Significantly differs from the cryptocurrency's price; excluded from the overall price and\n            volume calculation": string
  "The CMC team has not verified the project's Market Cap. However, according to the project, its self-reported CS is {{selfReportedCirculatingSupply}} {{symbol}} with a self-reported market cap of {{selfReportedMarketCap}}.": string
  coin_detail_wallets_seo_text: string
  "Ends ": string
  "Starts ": string
  "Liquidity Score": string
  "All Pairs": string
  "Show Less": string
  "Log in to track your portfolio": string
  "Log in to keep your watchlist when you’re on a different device or you remove cookies.": string
  "Max 20 items are allowed in the local watchlist": string
  "Market Cap = Current price x Circulating supply.": string
  "The CMC team has not verified the project's circulating supply. However, according to the project, its self-reported CS is {{selfReportedCirculatingSupply}} {{symbol}} with a self-reported market cap of {{selfReportedMarketCap}}.": string
  "The amount of coins that have been already created, minus any coins that have been burned (if there were any). It is analogous to the outstanding shares in the stock market.": string
  "If this data has not been submitted by the project or verified by the CMC team, total supply shows --.": string
  "If this data has not been submitted by the project or verified by the CMC team, max supply shows --.": string
  "Self reported Circulating supply": string
  "Track in your portfolio": string
  "Show all members": string
}

export type CommunityEditor = {}

export interface PageCDPCommon {
  "or download and install:": string
  "Wallet disconnected successfully!": string
  "Email verification expired. Please verify your email again.": string
  "Contact Us": string
  "Dex Pairs": string
  "commonheader_fear&greed_web": string
  "Open App": string
  "{{symbol}} to {{currency}} Converter": string
  "Our converter updates in real time giving you accurate data every time you use it to make a conversion.": string
  "{{fraction}} voted Fact": string
  "Join in or follow along in the {{name}} airdrop. Includes full airdrop details for the {{name}} project.": string
  "Disclaimer: This page may contain affiliate links. CoinMarketCap may be compensated if you visit any affiliate links and you take certain actions such as signing up and transacting with these affiliate platforms. Please refer to <a>Affiliate Disclosure</a>.": string
  "Liquidity Score": string
  "The amount of coins that have been already created, minus any coins that have been burned. It is analogous to the outstanding shares in the stock market.": string
  cdp_historical_page_back_web: string
  cdp_historical_page_daily: string
  cdp_historical_page_weekly: string
  cdp_historical_page_monthly: string
}

export interface Portfolio {
  "{{count}}/{{limit}} characters_plural": string
}

export interface SheetBTCHistoricalData {
  cdp_historical_page_title_web: string
  cdp_historical_page_daily_web: string
  cdp_historical_page_weekly_web: string
  cdp_historical_page_monthly_web: string
  bhd_open_web: string
  bhd_close_web: string
  currency_historicaldata_earlyrange_web: string
  currency_historicaldata_latestrange_web: string
  cdp_historical_page_download_web: string
  bhd_metatitle_web: string
  bhd_metadescription_web: string
  cdp_historical_page_title_web_2: string
}

export interface SheetCoinSugguestionEngine {
  similar_coins: string
  similar_coins_to_specific_coin: string
  best_match: string
  best_match_with_position: string
  see_more: string
  biggest_gainer: string
  highest_volume: string
  most_viewed: string
  most_recently_listed: string
  lowest_market_cap: string
  highest_market_cap: string
  most_shared_tags: string
  in_specific_number_of_shared_watchlists: string
  three_shared_tags: string
  market_cap_with_value: string
  market_cap_up_by_in_24h_with_value: string
  "24h_trading_volume_with_value": string
  listed_a_specific_number_of_months_ago: string
  listed_a_specific_number_of_days_ago: string
  similarity_score: string
  similarity_score_explanation: string
  shared_tags: string
}

export interface SheetCryptocurrencies {
  cryptos_bitcoin: string
  cryptos_ethereum: string
  cryptos_tether: string
  cryptos_bnb: CryptosBnb
  cryptos_solana: string
  cryptos_xrp: string
  "cryptos_usd-coin": string
  cryptos_cardano: string
  cryptos_avalanche: string
  cryptos_dogecoin: string
  cryptos_tron: string
  cryptos_chainlink: string
  "cryptos_polkadot-new": string
  cryptos_polygon: string
  cryptos_toncoin: string
  cryptos_uniswap: string
  "cryptos_shiba-inu": string
  "cryptos_internet-computer": string
  "cryptos_bitcoin-cash": string
  cryptos_litecoin: string
}

export enum CryptosBnb {
  Bnb = "BNB",
  Empty = "",
  HT = "HT",
}

export interface SheetNews {
  cdp_news_header: string
  cdp_news_top_selector: string
  cdp_news_latest_selector: string
  cdp_news_cmc_daily_analysis: string
  cdp_news_minutes_ago: string
  cdp_news_hours_ago: string
  cdp_news_days_ago: string
  cdp_news_view_all: string
}

export interface SheetTokenUnlocks {
  tokenunlock_meta_title_web: string
  tokenunlock_meta_description_web: string
  token_unlocks_title_web: string
  token_unlocks_title_description_web: string
  unlock_progress_col_web: string
  unlock_progress_web: string
  next_unlock_col_web: string
  next_unlock_web: string
  next_unlock_amount_web: string
  total_unlocked_web: string
  total_locked_web: string
  next_unlock_date_web: string
  unlock_time_web: string
  vesting_type_tge_web: string
  vesting_type_cliff_web: string
  vesting_type_linear_web: string
  vesting_type_inflationary_web: string
  vesting_type_deflationary_web: string
  vesting_type_non_linear_web: string
  vesting_type_tge_description_web: string
  vesting_type_cliff_description_web: string
  vesting_type_linear_description_web: string
  vesting_type_inflationary_description_web: string
  vesting_type_deflationary_description_web: string
  vesting_type_non_linear_description_web: string
  token_unlocks_submit_desc_web: string
  token_unlocks_submit_web: string
  token_unlocks_label_small_tu: string
  token_unlocks_tip_small_tu: string
}

export interface PageProps {
  detailRes: DetailRes
  dehydratedState: DehydratedState
  namespacesRequired: string[]
  reqLanguage: string
  mostVisitedCoins: MostVisitedCoin[]
  cdpFaqData: CDPFAQData
  reqLang: string
  globalMetrics: GlobalMetrics
  pageSharedData: PageSharedData
  pageSize: number
  noindex: boolean
}

export interface CDPFAQData {
  faqDescription: FAQDescription[]
}

export interface FAQDescription {
  q: string
  a: string
  isQ: boolean
}

export interface DetailRes {
  detail: Detail
  trending: Trending
  gravityFlag: boolean
  projectInfoFlag: boolean
  airDropFlag: boolean
  hasOngoingAirdrop: boolean
  nftChartFlag: boolean
  announcement: any[]
  mainAccount: MainAccount
  announcementNew: any[]
  popularCryptoInfo: PopularCryptoInfo
  suggestionCrypto: SuggestionCrypto[]
  pricePredictionGamingConfig: PricePredictionGamingConfig
  article: any[]
  tokenUnlockLatest: null
  isConverterPageActive: boolean
  hasYieldData: boolean
}

export interface Detail {
  id: number
  name: string
  symbol: string
  slug: string
  category: string
  dateAdded: Date
  status: Status
  subStatus: string
  notice: string
  alertType: number
  alertLink: string
  latestUpdateTime: Date
  watchCount: string
  watchListRanking: number
  latestAdded: boolean
  launchPrice: number
  tags: Tag[]
  urls: Urls
  volume: number
  volumeChangePercentage24h: number
  cexVolume: number
  dexVolume: number
  statistics: Statistics
  quotes: any[]
  platforms: Platform[]
  wallets: DetailWallet[]
  isAudited: boolean
  auditInfos: any[]
  holders: Holders
  displayTV: number
  isInfiniteMaxSupply: number
  tvCoinSymbol: string
  supportWalletInfos: SupportWalletInfo[]
  holdersFlag: boolean
  ratingsFlag: boolean
  analysisFlag: boolean
  socialsFlag: boolean
  cryptoRating: CryptoRating[]
  analysis: Analysis
  coinBitesVideo: CoinBitesVideo
  hasExtraInfoFlag: boolean
  earnList: EarnList[]
  upcoming: DetailUpcoming
  annotationFlag: boolean
  similarCoins: SimilarCoin[]
  description: string
  selfReportedTags: any[]
  dateLaunched: string
  relatedCoins: any[]
  relatedExchanges: any[]
}

export interface Analysis {
  holdingWhalesPercent: number
  holdingAddressesCount: number
  addressByTimeHeld: AddressByTimeHeld
}

export interface AddressByTimeHeld {
  holdersPercent: number
  cruisersPercent: number
  tradersPercent: number
}

export interface CoinBitesVideo {
  id: string
  category: string
  videoUrl: string
  title: string
  description: string
  previewImage: string
}

export interface CryptoRating {
  type: string
  score: number
  rating: number
  updateTime: Date
  link?: string
}

export interface EarnList {
  id: string
  rank: number
  provider: Provider
  apr: number[]
  netApy: number[]
  fee: number[]
  typeName: string
  type: string
  subType: string
  ecosystem: string
}

export interface Provider {
  id: number
  name: string
}

export interface Holders {
  dailyActive: number
}

export interface Platform {
  contractId: number
  contractAddress: string
  contractPlatform: string
  contractPlatformId: number
  contractChainId: number
  contractRpcUrl: string[]
  contractNativeCurrencyName: ContractNativeCurrencyName
  contractNativeCurrencySymbol: CryptosBnb
  contractNativeCurrencyDecimals: number
  contractBlockExplorerUrl: string
  contractExplorerUrl: string
  contractDecimals?: number
  platformCryptoId: number
  sort: number
  wallets: PlatformWallet[]
}

export enum ContractNativeCurrencyName {
  BinanceChainNativeToken = "Binance Chain Native Token",
  Empty = "",
  HuobiECOChainNativeToken = "Huobi ECO Chain Native Token",
}

export interface PlatformWallet {
  id: number
}

export interface SimilarCoin {
  id: number
  symbol: string
}

export interface Statistics {
  price: number
  priceChangePercentage1h: number
  priceChangePercentage24h: number
  priceChangePercentage7d: number
  priceChangePercentage30d: number
  priceChangePercentage60d: number
  priceChangePercentage90d: number
  priceChangePercentage1y: number
  priceChangePercentageAll: number
  marketCap: number
  marketCapChangePercentage24h: number
  fullyDilutedMarketCap: number
  fullyDilutedMarketCapChangePercentage24h: number
  circulatingSupply: number
  totalSupply: number
  marketCapDominance: number
  rank: number
  roi: number
  low24h: number
  high24h: number
  low7d: number
  high7d: number
  low30d: number
  high30d: number
  low90d: number
  high90d: number
  low52w: number
  high52w: number
  lowAllTime: number
  highAllTime: number
  lowAllTimeChangePercentage: number
  highAllTimeChangePercentage: number
  lowAllTimeTimestamp: Date
  highAllTimeTimestamp: Date
  lowYesterday: number
  highYesterday: number
  openYesterday: number
  closeYesterday: number
  priceChangePercentageYesterday: number
  volumeYesterday: number
  turnover: number
  ytdPriceChangePercentage: number
  volumeRank: number
  volumeMcRank: number
  mcTotalNum: number
  volumeTotalNum: number
  volumeMcTotalNum: number
  status: string
}

export enum Status {
  Active = "active",
}

export interface SupportWalletInfo {
  id: number
  name: string
  url: string
  chains: string
  decentration: boolean
  logo: string
  multipleChain: boolean
}

export interface Tag {
  slug: string
  name: string
  category: Category
}

export enum Category {
  Algorithm = "ALGORITHM",
  Category = "CATEGORY",
  Platform = "PLATFORM",
}

export interface DetailUpcoming {
  status: boolean
  upcoming: UpcomingUpcoming
}

export interface UpcomingUpcoming {
  hasMainAccountPosts: boolean
}

export interface Urls {
  website: string[]
  technical_doc: string[]
  explorer: string[]
  source_code: string[]
  message_board: string[]
  chat: string[]
  announcement: string[]
  reddit: string[]
  facebook: any[]
  twitter: string[]
}

export interface DetailWallet {
  id: number
  name: string
  tier?: number
  url: string
  chains: string
  types: string
  introduction: string
  star: number
  security: number
  easyToUse: number
  decentration: boolean
  focusNumber: number
  rank?: number
  logo: string
  multipleChain: boolean
}

export interface MainAccount {
  nickname: string
  handle: string
  avatarId: string
  createdTime: string
  oldUserId: string
  type: number
  status: number
  biography: string
  originalBiography: string
  currencies: CoinList[]
  websiteLink: string
  authType: number
  coinList: CoinList[]
  announceType: number
  avatar: Avatar
  vip: boolean
  frames: any[]
  badges: any[]
  guid: string
}

export interface Avatar {
  url: string
  status: number
}

export interface CoinList {
  id: number
  symbol: string
  slug: string
}

export interface PopularCryptoInfo {
  popularCrypto: PopularCrypto[]
  platformInfo: PlatformInfo
}

export interface PlatformInfo {
  id: number
  cryptocurrencyId: number
  name: string
  dexerPlatformName: string
}

export interface PopularCrypto {
  cryptoId: number
  symbol: string
  slug: string
  name: string
  priceUsd: number
  percentageChangePriceUsd24h: number
}

export interface PricePredictionGamingConfig {
  cryptoIdCheckResult: boolean
  gameId: string
}

export interface SuggestionCrypto {
  id: number
  name: string
  slug: string
  symbol: string
  coinSummary: string
  score: number
  watchCount: string
  price: number
  percentChange24h: number
  percentChange7d: number
  percentChange30d: number
  bestCrypto: boolean
  bestCryptoInfo?: BestCryptoInfo
  shareTags?: string
}

export interface BestCryptoInfo {
  bestCryptoSeq: number
  titleType: string
  subPointType: string
  subPointValue: string
}

export interface Trending {
  trendingList: MostVisitedCoin[]
}

export interface MostVisitedCoin {
  id: number
  dataType: number
  name: string
  symbol: string
  slug: string
  rank: number
  status: Status
  marketCap: number
  selfReportedMarketCap: number
  priceChange: PriceChange
  isActive: number
}

export interface PriceChange {
  price: number
  priceChange24h: number
  priceChange7d: number
  priceChange30d: number
  volume24h: number
  lastUpdate: Date
}

export interface PageSharedData {
  topCategories: TopCategory[]
  fearGreedIndexData: FearGreedIndexData
  faqData: FAQData
  halvingInfo: HalvingInfo
  deviceInfo: DeviceInfo
}

export interface DeviceInfo {
  isDesktop: boolean
  isTablet: boolean
  isMobile: boolean
}

export interface FAQData {
  language: string
  faqList: any[]
}

export interface FearGreedIndexData {
  currentIndex: CurrentIndex
  dialConfig: DialConfig[]
}

export interface CurrentIndex {
  score: number
  maxScore: number
  name: string
  updateTime: Date
}

export interface DialConfig {
  start: number
  end: number
  name: string
}

export interface HalvingInfo {
  dateOfHalving: string
  halvingTimeStamp: number
}

export interface TopCategory {
  title: string
  relatedTagSlug: string
}

export interface QuotesLatestDatum {
  id: number
  symbol: string
  p: number
  p1h: number
  p24h: number
  p7d: number
  p30d: number
  p60d: number
  p90d: number
  pytd: number
  t: number
}

export interface RQuery {
  cryptocurrencySlug: string
}
