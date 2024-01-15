export class PageNotFoundError extends Error {
  constructor(uri?: string) {
    super(`Page not found: ${uri ?? window.location.hash.slice(1)}`)
  }
}
