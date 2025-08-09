import fs from 'node:fs'
import path from 'node:path'

import parse from './parser.js'
import buildDiff from './buildDiff.js'
import getFormatter from './formatters/index.js'

const readFile = p => fs.readFileSync(p, 'utf-8')
const getExt = p => path.extname(p).slice(1).toLowerCase()

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(readFile(filepath1), getExt(filepath1))
  const data2 = parse(readFile(filepath2), getExt(filepath2))

  const diffTree = buildDiff(data1, data2)

  const format = getFormatter(formatName)
  return format(diffTree)
}

export default genDiff
