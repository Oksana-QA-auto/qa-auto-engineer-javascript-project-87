const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2)
const bracketIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - spacesCount)

const stringify = (value, depth) => {
  if (value !== null && typeof value === 'object') {
    const lines = Object
      .entries(value)
      .map(([key, val]) => `${getIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`)

    return [
      '{',
      ...lines,
      `${bracketIndent(depth + 1)}}`,
    ].join('\n')
  }

  return String(value)
}

const formatStylish = (diffTree) => {
  const iter = (nodes, depth) => nodes.flatMap((node) => {
    const indent = getIndent(depth)

    switch (node.type) {
      case 'nested':
        return [
          `${indent}${node.key}: {`,
          ...iter(node.children, depth + 1),
          `${bracketIndent(depth)}}`,
        ]

      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`

      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth)}`

      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth)}`

      case 'updated':
        return [
          `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
          `${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`,
        ]

      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  })

  return [
    '{',
    ...iter(diffTree, 1),
    '}',
  ].join('\n')
}

export default formatStylish
