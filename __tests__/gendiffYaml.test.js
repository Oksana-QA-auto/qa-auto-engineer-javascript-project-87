import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFixture = filename => fs.readFileSync(getFixturePath(filename), 'utf-8').trim()

test('gendiff flat yaml', () => {
  const expected = readFixture('expected_plain.txt')
  const diff = genDiff(
    getFixturePath('file1.yml'),
    getFixturePath('file2.yml'),
    'plain',
  )
  expect(diff).toBe(expected)
})
