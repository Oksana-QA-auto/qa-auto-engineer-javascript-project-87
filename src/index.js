import parse from './parser.js'
import buildDiff from './buildDiff.js'

export default function genDiff(path1, path2) {
  const obj1 = parse(path1)
  const obj2 = parse(path2)
  return buildDiff(obj1, obj2)
}
