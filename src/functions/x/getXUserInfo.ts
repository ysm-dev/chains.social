import { getXHeaders } from "@/functions/x/getXHeaders"
import { z } from "zod"

export const getXUserInfo = async (userId: string) => {
  const response = await fetch(
    `https://x.com/i/api/graphql/QGIw94L0abhuohrr76cSbw/UserByScreenName?${new URLSearchParams(
      {
        variables: JSON.stringify({ screen_name: userId }),
        features: JSON.stringify({
          hidden_profile_subscriptions_enabled: true,
          profile_label_improvements_pcf_label_in_post_enabled: false,
          rweb_tipjar_consumption_enabled: true,
          responsive_web_graphql_exclude_directive_enabled: true,
          verified_phone_label_enabled: false,
          subscriptions_verification_info_is_identity_verified_enabled: true,
          subscriptions_verification_info_verified_since_enabled: true,
          highlights_tweets_tab_ui_enabled: true,
          responsive_web_twitter_article_notes_tab_enabled: true,
          subscriptions_feature_can_gift_premium: true,
          creator_subscriptions_tweet_preview_api_enabled: true,
          responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
          responsive_web_graphql_timeline_navigation_enabled: true,
        }),
        fieldToggles: JSON.stringify({ withAuxiliaryUserLabels: false }),
      },
    )}`,
    {
      method: "GET",
      headers: getXHeaders(),
    },
  ).then((res) => res.json())

  const data = getXUserInfoSchema.parse(response)

  return { ...data.data.user.result.legacy }
}

const getXUserInfoSchema = z.object({
  data: z.object({
    user: z.object({
      result: z.object({
        __typename: z.string(),
        id: z.string(),
        rest_id: z.string(),
        legacy: z.object({
          screen_name: z.string(),
          followers_count: z.number(),
          friends_count: z.number(),
        }),
      }),
    }),
  }),
})
