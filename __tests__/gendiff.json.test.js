import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

test('gendiff json format', () => {
  const expected = fs.readFileSync(getFixturePath('expected_json.txt'), 'utf-8').trim()
  const diff = genDiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
    'json',
  )
  expect(diff).toBe(expected)
})
