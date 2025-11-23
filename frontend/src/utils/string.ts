// ['a', 'b', 'c'] => "a, b e c"
export function listToFormattedStr(arr: string[]) {
  if (arr.length === 0) {
    return ''
  }

  if (arr.length === 1) {
    return arr[0]
  }

  if (arr.length === 2) {
    return `${arr[0]} e ${arr[1]}`
  }

  return `${arr.slice(0, -1).join(', ')} e ${arr[arr.length - 1]}`
}