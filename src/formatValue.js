export default function formatValue(value) {
  if (typeof value === 'boolean' || value === null) {
    return String(value)
  }
  return value
}
