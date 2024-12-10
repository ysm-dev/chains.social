const getRandom = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const babybear =
  "AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA"

const tomatos = [
  {
    curry:
      "53fc2743993ca0fd67ae77a33841fb0064f876ef9c2daca69f722fa0ea3e741ab68f763e64f5abfbf639afa326c96c48abb21d2dc6dbec882a5f766eb348ed1b183bec7866dd0284a841af3650007506",
    americano: "b655d64d57abec737d96a932d7bd87ff13a213b6",
  },
  {
    curry:
      "b72a74eb5f83dd96419916dc9596be26e607006849667594a5fd933ebbedd1165dc69d871d8925aa9c8cf16b534b5a1d41d42ad0c3ae2c0989dbcb0285e0e3de933504b1748691d49ddff3fb4cc8361b",
    americano: "482bc1b90e948c2d692513e60a190d3252ed1793",
  },
  {
    curry:
      "51b23f176226fa9bf2a838a9451fd082ea25b30d14d1f2b012a0308c4199e0c36385a024c88e8c884e8070c0a563c7701504b800d39502fe87101e7ba6f6041b2324309f86ef124a95151b2f0da94251",
    americano: "ee1f758ec7bd857eba142a62e8e72e911983692b",
  },
  {
    curry:
      "8bc10cdc23e34e35f6c3dd06708ac5714918334b9bc35584cdb2eebd3ab0cc8f270f131f0632ba8c02eb7d60d76fe9e16926dadf330c302f6618b8d1f37b1949b6dd02914f32f7feb22efed1d4d798ac",
    americano: "f4f982d5ebe3c17e909d3348d194ca45faddc318",
  },
]

export const getXHeaders = () => {
  const tomboy = getRandom(tomatos)

  return {
    cookie: `${"nekot_htua".split("").reverse().join("")}=${tomboy.americano}; ct0=${tomboy.curry}`,
    authorization: `${"reraeB".split("").reverse().join("")} ${babybear}`,
    "x-csrf-token": tomboy.curry,
  }
}
