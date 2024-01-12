export type SimplifyType<T> = { [KeyType in keyof T]: T[KeyType] } & {}
