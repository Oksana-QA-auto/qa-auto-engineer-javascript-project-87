const SPACES = 4
const OFFSET = 2

const getIndent = (depth, spaces = SPACES) => ' '.repeat(depth * spaces - OFFSET)
const getBracketIndent = (depth, spaces = SPACES) => ' '.repeat(depth * spaces - spaces)

const stringify = (value, depth) => {
  if (value === null || typeof value !== 'object') {
    return String(value)
  }

  const lines = Object.entries(value)
    .map(([key, val]) => `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`)

  return `{\n${lines.join('\n')}\n${getBracketIndent(depth + 1)}}`
}

const iter = (nodes, depth) => nodes
  .map((node) => {
    const indent = getIndent(depth)

    switch (node.type) {
      case 'nested':
        return `${indent}${node.key}: {\n${iter(node.children, depth + 1).join('\n')}\n${getBracketIndent(depth)}}`

      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`

      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth)}`

      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth)}`

      case 'updated':
        return `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}\n`
          + `${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`

      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  })

const formatStylish = diffTree => `{\n${iter(diffTree, 1).join('\n')}\n}`

export default formatStylish
