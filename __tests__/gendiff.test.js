import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8').trim()

const expectedStylish = readFile('expected_stylish.txt')
const expectedPlain = readFile('expected_plain.txt')
const expectedJson = readFile('expected_json.txt')

const formats = ['json', 'yml']
const outputs = [
  { format: undefined, expected: expectedStylish },
  { format: 'stylish', expected: expectedStylish },
  { format: 'plain', expected: expectedPlain },
  { format: 'json', expected: expectedJson },
]

describe('genDiff', () => {
  test.each(formats)('compare %s files in all output formats', (format) => {
    const file1 = getFixturePath(`file1.${format}`)
    const file2 = getFixturePath(`file2.${format}`)

    outputs.forEach(({ format: outputFormat, expected }) => {
      const result = genDiff(file1, file2, outputFormat)

      // Нормализуем переходы строк для корректного сравнения (Windows vs Unix)
      const normalizeNewlines = str => str.replace(/\r\n/g, '\n')

      const isJson = outputFormat === 'json'
      const actual = isJson ? JSON.parse(result) : normalizeNewlines(result)
      const expectedValue = isJson ? JSON.parse(expected) : normalizeNewlines(expected)

      expect(actual).toEqual(expectedValue)
    })
  })
})
