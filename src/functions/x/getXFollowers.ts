export const getXFollowers = async (userId: string) => {
  const response = await fetch(
    `https://api.github.com/users/${userId}/followers`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.X_BEARER_TOKEN}`,
      },
    },
  ).then((res) => {
    return res.json()
  })

  console.log({ response })
}
