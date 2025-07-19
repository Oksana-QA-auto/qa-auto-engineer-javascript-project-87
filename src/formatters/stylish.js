const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2)
const bracketIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - spacesCount)

const formatValue = (value, depth) => {
  if (value !== null && typeof value === 'object') {
    const entries = Object.entries(value)
    const lines = entries.map(
      ([key, val]) => `${bracketIndent(depth + 1)}  ${key}: ${formatValue(val, depth + 1)}`,
    )
    return [
      '{',
      ...lines,
      `${bracketIndent(depth + 1)}}`,
    ].join('\n')
  }
  return String(value)
}

export default function formatStylish(diffTree) {
  const iter = (nodes, depth) => nodes.flatMap((node) => {
    const indent = getIndent(depth)

    switch (node.type) {
      case 'nested':
        return [
          `${indent}  ${node.key}: {`,
          ...iter(node.children, depth + 1),
          `${bracketIndent(depth + 1)}}`,
        ]
      case 'added':
        return `${indent}+ ${node.key}: ${formatValue(node.value, depth)}`
      case 'removed':
        return `${indent}- ${node.key}: ${formatValue(node.value, depth)}`
      case 'unchanged':
        return `${indent}  ${node.key}: ${formatValue(node.value, depth)}`
      case 'updated':
        return [
          `${indent}- ${node.key}: ${formatValue(node.oldValue, depth)}`,
          `${indent}+ ${node.key}: ${formatValue(node.newValue, depth)}`,
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
