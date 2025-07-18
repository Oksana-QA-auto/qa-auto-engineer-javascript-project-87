import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = name => path.join(__dirname, '..', '__fixtures__', name)
const readFixture = name =>
  fs.readFileSync(getFixturePath(name), 'utf-8').trim()

test('gendiff flat json', () => {
  const expected = readFixture('expected_flat.txt')
  const diff = genDiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
  )
  expect(diff).toBe(expected)
})
