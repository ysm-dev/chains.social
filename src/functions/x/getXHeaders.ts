const getRandom = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const babybear =
  "AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA"

const tomatos = [
  {
    curry:
      "af2bae2e3cfa933267cd1b46428255e9dbe51577b5a43ba4291ecef8c3c44cc929d02a224e6ce57306addfb9718ddb6596db00610da07173e1ab5003ead14728f4bb8800b5bf1918280115f34c9624c1",
    americano: "7298e8d254a42e6ff085c54749fc7c076376b5c8",
  },
  {
    curry: `32bef14bda8595cbeb45950e65ad18d6b00bd75bf40d9ca200e70e048959baa6b61fc583af510fefb6b60521922445bfdfcc06707d0b5cf2e9b5ece01020cf6ec1301f560a2432c933b74b55b8dd9aac`,
    americano: `31ea0855eefe20c3d504ce5c834a3e1dade8076d`,
  },
  {
    curry: `5d0cd9e32bef10522295b372bb040622e9e0d7f9c0bd1e844879fef03127f08821766734eb7e48f5c7ecd636c389187bcf06e265576b4ac9ea779797b4efbca1285d239831beac4238b1d0e347778ff6`,
    americano: `939b7a5028ba9c0644fdcd5fed7eed89edf10b78`,
  },
  {
    curry: `fc85f4483a192e71f3663ef3d778f9bd7b8effda2b8707265b78bd15ce0d4bde86c580345c34e69db467e43aa692e9f94982b43c387e12b72b717763f64d566422e24151e3dd80b02a060bd6250f4839`,
    americano: `43f3f33c075607915f243cdbb618a07066c751d1`,
  },
  {
    curry: `c4fd0e8226f8cb5c75706f8f424a85e692bf437ad6ee4030a9a77c22a3e2c2d795108f5ff2e89ea589ed9bcdd18cd421edfdaf05676a9cf45b22c23cb614d74b2a1364082b491175f784a212c64d597a`,
    americano: `03196d32ae29d7e840fe1564d328f3f68b3b5f9a`,
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
