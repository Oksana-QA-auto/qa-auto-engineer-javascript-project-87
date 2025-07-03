import { fileURLToPath } from 'url'
import path from 'path'
import { readFileSync } from 'fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFixture = filename => readFileSync(getFixturePath(filename), 'utf-8')

test('gendiff flat json', () => {
  const expected = readFixture('expected_flat.txt').trim()
  const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))
  expect(diff).toBe(expected)
})
