const wait = (millisecond: number = 1000): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`${millisecond}ミリ秒待機しました。`)
      resolve()
    }, millisecond)
  })
}

export default wait
