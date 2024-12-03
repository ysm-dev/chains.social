import { memoize } from "@fxts/core"
import { z } from "zod"

export const getDiscordInviteInfo = memoize(async (inviteId: string) => {
  const response = await fetch(
    `https://discord.com/api/invites/${inviteId}?${new URLSearchParams({
      with_counts: "true",
    })}`,
  ).then<GetDiscordInviteInfoResponse>((res) => res.json())

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
