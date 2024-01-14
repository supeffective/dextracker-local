export function replaceVars(code: string, data: Record<string, unknown>, delimiters: [start: string, end: string]) {
  const dataVars = Object.entries(data)
  const [tstart, tend] = delimiters

  let transformedCode = code
  for (const [key, value] of dataVars) {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      const regex = new RegExp(`${tstart}\s?${key}\s?${tend}`, 'g')
      transformedCode = transformedCode.replace(regex, String(value))
    }
  }

  return transformedCode
}
