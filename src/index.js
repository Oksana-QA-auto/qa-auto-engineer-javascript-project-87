import parse from './parser.js'
import buildDiff from './buildDiff.js'
import formatDiff from './formatters/index.js'

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const data1 = parse(filepath1)
  const data2 = parse(filepath2)
  const diffTree = buildDiff(data1, data2)
  return formatDiff(diffTree, formatName)
}
