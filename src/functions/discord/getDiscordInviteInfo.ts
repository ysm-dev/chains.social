import { memoize } from "@fxts/core"
import { z } from "zod"

export const getDiscordInviteInfo = memoize((inviteId: string) => {
  return fetch(
    `https://discord.com/api/invites/${inviteId}?${new URLSearchParams({
      with_counts: "true",
    })}`,
  ).then<GetDiscordInviteInfoResponse>((res) => res.json())
})

export const getDiscordInviteInfoSchema = z.object({
  type: z.number(),
  code: z.string(),
  expires_at: z.null(),
  flags: z.number(),
  guild: z.object({
    id: z.string(),
    name: z.string(),
    splash: z.string(),
    banner: z.string(),
    description: z.string(),
    icon: z.string(),
    features: z.array(z.string()),
    verification_level: z.number(),
    vanity_url_code: z.string(),
    nsfw_level: z.number(),
    nsfw: z.boolean(),
    premium_subscription_count: z.number(),
  }),
  guild_id: z.string(),
  channel: z.object({
    id: z.string(),
    type: z.number(),
    name: z.string(),
  }),
  approximate_member_count: z.number(),
  approximate_presence_count: z.number(),
})

export type GetDiscordInviteInfoResponse = z.infer<
  typeof getDiscordInviteInfoSchema
>
