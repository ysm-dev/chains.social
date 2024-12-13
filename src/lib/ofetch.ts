import { PROXY_URL } from "@/lib/env"
import type { FetchOptions, FetchRequest, ResponseType } from "ofetch"
import { ofetch as fetch } from "ofetch"

export const ofetch = async <T = any, R extends ResponseType = "json">(
  request: FetchRequest,
  options?: FetchOptions<R>,
) => {
  const response = await fetch.raw<T, R>(request, {
    ...options,
  })

  if (response.status === 403 || response.status === 429) {
    console.log("Rate limited")
    const data = await fetch<T, R>(`${PROXY_URL}/${request}`, {
      ...options,
    })

    return data
  }

  return response._data
}
