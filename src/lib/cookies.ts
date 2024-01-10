import { isClientSide } from './utils'

export function parseClientCookies(): Map<string, string> {
  const cookieMap = new Map<string, string>()
  if (!isClientSide() || !document.cookie) {
    return cookieMap
  }
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    if (typeof cookie !== 'string') {
      continue
    }
    const [name, value] = cookie.split('=')
    cookieMap.set(String(name).trim(), String(value).trim())
  }
  return cookieMap
}

export function readClientCookie(name: string): string | null {
  const cookies = parseClientCookies()
  return cookies.get(name) ?? null
}

export function setClientCookie(name: string, value: string, ttlInSeconds: number): void {
  if (!isClientSide()) {
    return
  }
  const date = new Date()
  date.setTime(date.getTime() + ttlInSeconds * 1000)
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`
}

// export function useTemporaryCookie(name: string, value: string, ttlInSeconds: number): string | null {
//   const [cookieValue, setCookieValue] = useState<string | null>(null)

//   useEffect(() => {
//     const cookies = parseCookies()
//     const cookieValue = cookies.get(name)
//     if (cookieValue) {
//       setCookieValue(cookieValue)
//     } else {
//       setCookie(name, value, ttlInSeconds)
//       setCookieValue(value)
//     }
//   }, [name, value, ttlInSeconds])

//   return cookieValue
// }
