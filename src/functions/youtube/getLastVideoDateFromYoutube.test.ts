import { getLastVideoDateFromYoutube } from "@/functions/youtube/getLastVideoDateFromYoutube"
import { describe, expect, it } from "vitest"

describe("getLastVideoDateFromYoutube", () => {
  it("ethereum", async () => {
    const channelId = "UC6rYoXJ_3BbPyWx_GQDDRRQ"

    const response = await getLastVideoDateFromYoutube(channelId)

    expect(response).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })

  it("algorand", async () => {
    const channelId = "UCsda5E-IaXyUi8dzauyXypA"

    const response = await getLastVideoDateFromYoutube(channelId)

    expect(response).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })

  it("bnb", async () => {
    const channelId = "UCG9fZu6D4I83DStktBV0Ryw"

    const response = await getLastVideoDateFromYoutube(channelId)

    expect(response).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })

  it("cardano", async () => {
    const channelId = "UCbQ9vGfezru1YRI1zDCtTGg"

    const response = await getLastVideoDateFromYoutube(channelId)

    expect(response).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })

  it("tron", async () => {
    const channelId = "UC5OPOGRq02iK-0T9sKse_kA"

    const response = await getLastVideoDateFromYoutube(channelId)

    expect(response).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })
})
