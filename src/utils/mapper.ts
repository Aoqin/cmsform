export function mapTo<T, U>(obj: T, target: U): U {
  for (const key in obj) {
    // if (obj.hasOwnProperty(key)) {
    if (Object.hasOwnProperty.call(obj, key)) {
      target[key] = obj[key]
    }
  }
  return target
}
