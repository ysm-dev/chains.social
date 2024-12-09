import { memoize } from "@fxts/core"
import { ofetch } from "ofetch"
import { z } from "zod"

/*
  x-ratelimit-limit: none
  x-reatelimit-rest: none
*/
export const getDiscordInviteInfo = memoize(async (inviteId: string) => {
  const response = await ofetch<GetDiscordInviteInfoResponse>(
    `https://discord.com/api/invites/${inviteId}`,
    {
      query: {
        with_counts: true,
      },
    },
  )

  return getDiscordInviteInfoSchema.parse(response)
})

export const getDiscordInviteInfoSchema = z.object({
  code: z.string(),
  approximate_member_count: z.number(),
  approximate_presence_count: z.number(),
})

export type GetDiscordInviteInfoResponse = z.infer<
  typeof getDiscordInviteInfoSchema
>
