export function mapTo<T, U>(obj: T, target: U): U {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      target[key] = obj[key]
    }
  }
  return target
}
