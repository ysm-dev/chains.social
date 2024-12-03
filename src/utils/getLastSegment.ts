export const getLastSegment = (input: string, length = 1) => {
  return input.split("/").slice(-length)
}
