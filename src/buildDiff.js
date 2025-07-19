import _ from 'lodash'

export default function buildDiff(obj1, obj2) {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))

  return keys.map((key) => {
    const has1 = Object.prototype.hasOwnProperty.call(obj1, key)
    const has2 = Object.prototype.hasOwnProperty.call(obj2, key)

    if (has1 && has2) {
      const val1 = obj1[key]
      const val2 = obj2[key]
      if (_.isEqual(val1, val2)) {
        return { key, type: 'unchanged', value: val1 }
      }
      return { key, type: 'updated', oldValue: val1, newValue: val2 }
    }
    if (has1) {
      return { key, type: 'removed', value: obj1[key] }
    }
    return { key, type: 'added', value: obj2[key] }
  })
}
