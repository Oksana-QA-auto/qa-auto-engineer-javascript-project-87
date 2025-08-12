import stylish from './stylish.js'
import plain from './plain.js'
import toJson from './json.js'

const formatters = {
  stylish,
  plain,
  json: toJson,
}

const format = (diffTree, formatName = 'stylish') => {
  const formatter = formatters[formatName]
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`)
  }
  return formatter(diffTree)
}

export default format
