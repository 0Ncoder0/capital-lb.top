export const loop = (n: number, fn: (i: number) => void) => {
  for (let i = 0; i < n; i++) {
    fn(i)
  }
}

export const list = <T>(n: number, fn: (i: number, arr: T[]) => T): T[] => {
  const arr: T[] = []
  for (let i = 0; i < n; i++) {
    arr.push(fn(i, arr))
  }
  return arr
}
