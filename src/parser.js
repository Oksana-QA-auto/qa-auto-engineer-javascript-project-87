import YAML from 'js-yaml'

const parse = (data, format) => {
  const normalizedFormat = String(format).toLowerCase()

  switch (normalizedFormat) {
    case 'json':
      return JSON.parse(data)
    case 'yml':
    case 'yaml':
      return YAML.load(data)
    default:
      throw new Error(`Unsupported data format: ${format}`)
  }
}

export default parse
