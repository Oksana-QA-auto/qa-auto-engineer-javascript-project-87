import _ from 'lodash'

import formatValue from './formatValue.js'

export default function buildDiff(before, after) {
  const keys = _.sortBy(_.union(Object.keys(before), Object.keys(after)))

  const lines = keys.flatMap((key) => {
    const hasBefore = Object.hasOwn(before, key)
    const hasAfter = Object.hasOwn(after, key)

    if (hasBefore && !hasAfter) {
      return `  - ${key}: ${formatValue(before[key])}`
    }

    if (!hasBefore && hasAfter) {
      return `  + ${key}: ${formatValue(after[key])}`
    }

    if (_.isEqual(before[key], after[key])) {
      return `    ${key}: ${formatValue(before[key])}`
    }

    return [
      `  - ${key}: ${formatValue(before[key])}`,
      `  + ${key}: ${formatValue(after[key])}`,
    ]
  })

  return ['{', ...lines, '}'].join('\n')
}
