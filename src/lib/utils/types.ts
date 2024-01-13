export type SimplifyType<T> = { [KeyType in keyof T]: T[KeyType] } & {}
export type MultiFormatImage = {
  avifSrc: string
  webpSrc: string
  fallbackSrc: string
}
