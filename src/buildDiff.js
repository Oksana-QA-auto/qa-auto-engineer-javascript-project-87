import _ from 'lodash'

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)))

  return keys.map((key) => {
    const has1 = Object.prototype.hasOwnProperty.call(data1, key)
    const has2 = Object.prototype.hasOwnProperty.call(data2, key)

    if (has1 && has2) {
      const val1 = data1[key]
      const val2 = data2[key]
      if (_.isEqual(val1, val2)) {
        return { key, type: 'unchanged', value: val1 }
      }
      return { key, type: 'updated', oldValue: val1, newValue: val2 }
    }

    if (has1) {
      return { key, type: 'removed', value: data1[key] }
    }

    return { key, type: 'added', value: data2[key] }
  })
}

export default buildDiff
