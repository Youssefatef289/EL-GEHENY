export function deepMerge(target, source) {
  if (!source || typeof source !== 'object') return target
  const out = Array.isArray(target) ? [...target] : { ...target }
  for (const key of Object.keys(source)) {
    const value = source[key]
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      out[key] = deepMerge(out[key] || {}, value)
    } else {
      out[key] = value
    }
  }
  return out
}
