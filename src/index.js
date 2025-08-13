import fs from 'node:fs'
import path from 'node:path'

import parse from './parser.js'
import buildDiff from './buildDiff.js'
import getFormatter from './formatters/index.js'

const readFile = filePath => fs.readFileSync(filePath, 'utf-8')
const getExt = filePath => path.extname(filePath).slice(1).toLowerCase()

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const data1 = parse(readFile(filePath1), getExt(filePath1))
  const data2 = parse(readFile(filePath2), getExt(filePath2))

  const diffTree = buildDiff(data1, data2)

  const formatter = getFormatter(formatName)
  return formatter(diffTree)
}

export default genDiff
