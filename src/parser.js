import YAML from 'js-yaml'

export default function parse(data, format) {
  const kind = String(format).replace(/^\./, '').toLowerCase()

  switch (kind) {
    case 'json':
      return JSON.parse(data)
    case 'yml':
    case 'yaml':
      return YAML.load(data)
    default:
      throw new Error(`Unsupported data format: ${format}`)
  }
}
