export const getLastSegment = (input: string) => {
  return input.split("/").at(-1)!
}
