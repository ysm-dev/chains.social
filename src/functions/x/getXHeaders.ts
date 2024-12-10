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
]

export const getXHeaders = () => {
  const tomboy = getRandom(tomatos)

  return {
    cookie: `${"nekot_htua".split("").reverse().join("")}=${tomboy.americano}; ct0=${tomboy.curry}`,
    authorization: `${"reraeB".split("").reverse().join("")} ${babybear}`,
    "x-csrf-token": tomboy.curry,
  }
}
