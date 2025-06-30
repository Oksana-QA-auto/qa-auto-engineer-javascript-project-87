import _ from 'lodash'
import formatValue from './formatValue.js'

export default function buildDiff(obj1, obj2) {
  const sortedKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))

  const lines = sortedKeys.flatMap((key) => {
    const in1 = Object.hasOwn(obj1, key)
    const in2 = Object.hasOwn(obj2, key)

    if (in1 && !in2) {
      return `  - ${key}: ${formatValue(obj1[key])}`
    }
    if (!in1 && in2) {
      return `  + ${key}: ${formatValue(obj2[key])}`
    }
    if (obj1[key] === obj2[key]) {
      return `    ${key}: ${formatValue(obj1[key])}`
    }
    return [
      `  - ${key}: ${formatValue(obj1[key])}`,
      `  + ${key}: ${formatValue(obj2[key])}`,
    ]
  })

  return ['{', ...lines, '}'].join('\n')
}
