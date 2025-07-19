import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFixture = filename => fs.readFileSync(getFixturePath(filename), 'utf-8').trim()

test('gendiff stylish format', () => {
  const expected = readFixture('expected_stylish.txt')
  const diff = genDiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
  )
  // Normalize line endings to avoid test failures on Windows vs Unix
  expect(diff.replace(/\r\n/g, '\n')).toEqual(expected.replace(/\r\n/g, '\n'))
})
