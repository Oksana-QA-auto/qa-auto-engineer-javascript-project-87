import fs from 'node:fs'

import buildDiff from './buildDiff.js'

export default function genDiff(path1, path2) {
  const content1 = fs.readFileSync(path1, 'utf-8')
  const content2 = fs.readFileSync(path2, 'utf-8')

  const obj1 = JSON.parse(content1)
  const obj2 = JSON.parse(content2)

  return buildDiff(obj1, obj2)
}
