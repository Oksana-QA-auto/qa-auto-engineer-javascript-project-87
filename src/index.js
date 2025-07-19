import parse from './parser.js'
import buildDiff from './buildDiff.js'
import formatDiff from './formatters/index.js'

export default function gendiff(filepath1, filepath2, formatName = 'stylish') {
  const obj1 = parse(filepath1)
  const obj2 = parse(filepath2)
  const diffTree = buildDiff(obj1, obj2)
  const formatter = formatDiff(formatName)
  return formatter(diffTree)
}
