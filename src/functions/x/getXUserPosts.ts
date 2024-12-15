import { getXHeaders } from "@/functions/x/getXHeaders"
import { ofetch } from "@/lib/ofetch"
import { memoize } from "@fxts/core"
import { z } from "zod"

/*
  x-ratelimit-limit: 50
  x-ratelimit-rest: 15 minutes
*/
export const getXUserPosts = memoize(async (userId: string) => {
  const response = await ofetch<GetXUserPostsResponse>(
    `https://x.com/i/api/graphql/tzh4soFIeC6EUW0aLxrYpQ/UserTweets`,
    {
      headers: getXHeaders(),
      query: {
        variables: JSON.stringify({
          userId: userId,
          count: 1,
          includePromotedContent: false,
          withQuickPromoteEligibilityTweetFields: false,
          withVoice: false,
          withV2Timeline: false,
        }),
        features: JSON.stringify({
          profile_label_improvements_pcf_label_in_post_enabled: false,
          rweb_tipjar_consumption_enabled: true,
          responsive_web_graphql_exclude_directive_enabled: true,
          verified_phone_label_enabled: false,
          creator_subscriptions_tweet_preview_api_enabled: true,
          responsive_web_graphql_timeline_navigation_enabled: true,
          responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
          premium_content_api_read_enabled: false,
          communities_web_enable_tweet_community_results_fetch: true,
          c9s_tweet_anatomy_moderator_badge_enabled: true,
          articles_preview_enabled: true,
          responsive_web_edit_tweet_api_enabled: true,
          graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
          view_counts_everywhere_api_enabled: true,
          longform_notetweets_consumption_enabled: true,
          responsive_web_twitter_article_tweet_consumption_enabled: true,
          tweet_awards_web_tipping_enabled: false,
          creator_subscriptions_quote_tweet_preview_enabled: false,
          freedom_of_speech_not_reach_fetch_enabled: true,
          standardized_nudges_misinfo: true,
          tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
          rweb_video_timestamps_enabled: true,
          longform_notetweets_rich_text_read_enabled: true,
          longform_notetweets_inline_media_enabled: true,
          responsive_web_enhance_cards_enabled: false,
        }),
        fieldToggles: JSON.stringify({ withArticlePlainText: false }),
      },
    },
  )

  const data = getXUserTweetsSchema.parse(response)

  const lastPost = data.data.user.result.timeline.timeline.instructions
    .find((v) => v.type === "TimelineAddEntries")
    ?.entries.find((v) => v.content.entryType === "TimelineTimelineItem")

  if (
    !lastPost ||
    !lastPost.content.itemContent ||
    !lastPost.content.itemContent.tweet_results.result.legacy?.created_at
  ) {
    throw new Error("No tweets found")
  }

  const lastPostDate = new Date(
    lastPost.content.itemContent.tweet_results.result.legacy.created_at,
  ).toISOString()

  return { lastPostDate }
})

const getXUserTweetsSchema = z.object({
  data: z.object({
    user: z.object({
      result: z.object({
        timeline: z.object({
          timeline: z.object({
            instructions: z.array(
              z.discriminatedUnion("type", [
                z.object({ type: z.literal("TimelineClearCache") }),
                z.object({
                  type: z.literal("TimelinePinEntry"),
                }),
                z.object({
                  type: z.literal("TimelineAddEntries"),
                  entries: z
                    .array(
                      z.object({
                        entryId: z.string(),
                        sortIndex: z.string(),
                        content: z.object({
                          entryType: z.string(),
                          itemContent: z
                            .object({
                              tweet_results: z.object({
                                result: z.object({
                                  __typename: z.string(),
                                  rest_id: z.string().optional(),
                                  legacy: z
                                    .object({
                                      created_at: z.string(),
                                    })
                                    .optional(),
                                }),
                              }),
                            })
                            .optional(),
                        }),
                      }),
                    )
                    .min(1),
                }),
              ]),
            ),
          }),
        }),
      }),
    }),
  }),
})

export type GetXUserPostsResponse = z.infer<typeof getXUserTweetsSchema>
