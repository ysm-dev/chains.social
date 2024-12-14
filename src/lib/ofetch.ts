import { PROXY_URL } from "@/lib/env"
import type { FetchOptions, FetchRequest, ResponseType } from "ofetch"
import { ofetch as fetch } from "ofetch"

export const ofetch = async <T = any, R extends ResponseType = "json">(
  request: FetchRequest,
  options?: FetchOptions<R>,
) => {
  const response = await fetch.raw<T, R>(request, {
    ...options,
    ignoreResponseError: true,
  })

  if (response.status === 403 || response.status === 429) {
    console.log("Rate limited", request)
    const data = await fetch<T, R>(`${PROXY_URL}/${request}`, {
      ...options,
    })

    return data
  }

  if (response.status === 404) {
    return null
  }

  return response._data
}
