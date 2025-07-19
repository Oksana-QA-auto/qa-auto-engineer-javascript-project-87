import path from 'path'
import { readFileSync } from 'fs'

import genDiff from '../src/index.js'

const __dirname = path.resolve()

const getFixturePath = filename => path.join(__dirname, '__fixtures__', filename)
const readFile = filename => readFileSync(getFixturePath(filename), 'utf-8')

test('gendiff plain formatter', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')
  const expected = readFile('expected_plain.txt').trim()

  const diff = genDiff(filepath1, filepath2, 'plain')
  expect(diff).toBe(expected)
})
