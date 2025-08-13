import _ from 'lodash'

const SPACES = 4
const OFFSET = 2

const getIndent = (depth, spaces = SPACES) => ' '.repeat(depth * spaces - OFFSET)
const getBracketIndent = (depth, spaces = SPACES) => ' '.repeat(depth * spaces - spaces)

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value)
  }

  const lines = Object.entries(value)
    .map(([key, val]) => `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`)

  return `{\n${lines.join('\n')}\n${getBracketIndent(depth + 1)}}`
}

const iter = (nodes, depth) => nodes.flatMap((node) => {
  const indent = getIndent(depth)

  switch (node.type) {
    case 'nested':
      return [
        `${indent}  ${node.key}: {`,
        ...iter(node.children, depth + 1),
        `${getBracketIndent(depth)}}`,
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

const formatStylish = diffTree => `{\n${iter(diffTree, 1).join('\n')}\n}`

export default formatStylish
