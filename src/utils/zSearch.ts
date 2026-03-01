function normalizeString(value: string): string {
  return value.toLowerCase().trim()
}

export function buildZArray(s: string): number[] {
  const z = new Array(s.length).fill(0)
  let left = 0
  let right = 0

  for (let i = 1; i < s.length; i += 1) {
    if (i <= right) {
      z[i] = Math.min(right - i + 1, z[i - left])
    }

    while (i + z[i] < s.length && s[z[i]] === s[i + z[i]]) {
      z[i] += 1
    }

    if (i + z[i] - 1 > right) {
      left = i
      right = i + z[i] - 1
    }
  }

  return z
}

export function containsByZ(text: string, pattern: string): boolean {
  const normalizedText = normalizeString(text)
  const normalizedPattern = normalizeString(pattern)

  if (!normalizedPattern) {
    return true
  }

  if (!normalizedText) {
    return false
  }

  const combined = `${normalizedPattern}\u0000${normalizedText}`
  const z = buildZArray(combined)

  return z.some((value, index) => index > normalizedPattern.length && value >= normalizedPattern.length)
}

export { normalizeString }
