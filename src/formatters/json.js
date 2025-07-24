export default function formatJson(diffTree) {
  return JSON.stringify(diffTree, null, 2)
}
