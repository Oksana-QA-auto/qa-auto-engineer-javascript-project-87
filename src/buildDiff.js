import _ from 'lodash'

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)))

  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] }
    }

    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] }
    }

    const value1 = data1[key]
    const value2 = data2[key]

    if (_.isEqual(value1, value2)) {
      return { key, type: 'unchanged', value: value1 }
    }

    return { key, type: 'updated', oldValue: value1, newValue: value2 }
  })
}

export default buildDiff
