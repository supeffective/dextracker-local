export function isDefined<T>(argument: unknown): argument is T {
  return argument !== undefined
}
