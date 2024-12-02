export const getLastSegment = (input: string) => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  return input.split("/").at(-1)!
}
