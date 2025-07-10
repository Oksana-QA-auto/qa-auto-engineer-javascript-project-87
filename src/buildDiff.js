import _ from 'lodash'

import formatValue from './formatValue.js'

export default function buildDiff(obj1, obj2) {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))

  const lines = keys.flatMap((key) => {
    const has1 = Object.prototype.hasOwnProperty.call(obj1, key)
    const has2 = Object.prototype.hasOwnProperty.call(obj2, key)

    if (has1 && has2) {
      const val1 = obj1[key]
      const val2 = obj2[key]
      if (_.isEqual(val1, val2)) {
        return [`  ${key}: ${formatValue(val1)}`]
      }
      return [
        `  - ${key}: ${formatValue(val1)}`,
        `  + ${key}: ${formatValue(val2)}`,
      ]
    }

    if (has1) {
      return [`  - ${key}: ${formatValue(obj1[key])}`]
    }

    return [`  + ${key}: ${formatValue(obj2[key])}`]
  })

  return ['{', ...lines, '}'].join('\n')
}
