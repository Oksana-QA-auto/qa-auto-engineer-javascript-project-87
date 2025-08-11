const formatValue = (value) => {
  if (value === null) return 'null'
  if (typeof value === 'string') return `'${value}'`
  if (typeof value === 'object') return '[complex value]'
  return String(value)
}

const getPropertyName = (ancestry, key) => [...ancestry, key].join('.')

const formatPlain = (tree) => {
  const iter = (nodes, ancestry = []) =>
    nodes
      .flatMap((node) => {
        const property = getPropertyName(ancestry, node.key)

        switch (node.type) {
          case 'added':
            return `Property '${property}' was added with value: ${formatValue(node.value)}`
          case 'removed':
            return `Property '${property}' was removed`
          case 'updated':
            return `Property '${property}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
          case 'nested':
            return iter(node.children, [...ancestry, node.key])
          case 'unchanged':
            return []
          default:
            throw new Error(`Unknown node type: ${node.type}`)
        }
      })
      .filter(Boolean)
      .join('\n')

  return iter(tree)
}

export default formatPlain
