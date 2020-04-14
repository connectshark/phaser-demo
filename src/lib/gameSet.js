export function formaterData (arr) {
  return arr.map((item) => {
    while (item.data.length < 6) {
      item.data.push(0)
    }
    return {
      stage: item.stage,
      data: item.data
    }
  })
}
export function spliter (arr) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item.data.length > 6) {
      const redu = item.data.slice(6, item.data.length)
      item.data.splice(6, item.data.length)
      for (let j = 0; j < redu.length; j++) {
        const ele = redu[j]
        arr[i - j - 1].data[5] = ele
      }
    }
  }
  return arr
}
