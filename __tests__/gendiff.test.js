import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = name => join(__dirname, '..', '__fixtures__', name)
const readFile = name => fs.readFileSync(getFixturePath(name), 'utf-8').trim()

const expectedStylish = readFile('expected_stylish.txt')
const expectedPlain = readFile('expected_plain.txt')
const expectedJson = readFile('expected_json.txt')

describe('genDiff', () => {
  test.each(['json', 'yml'])('compare %s files in all output formats', (format) => {
    const file1 = getFixturePath(`file1.${format}`)
    const file2 = getFixturePath(`file2.${format}`)

    expect(genDiff(file1, file2)).toEqual(expectedStylish)
    expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish)
    expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain)
    expect(genDiff(file1, file2, 'json')).toEqual(expectedJson)
  })
})

describe('errors', () => {
  test('throws on unsupported file extension', () => {
    const bad = getFixturePath('file1.txt')
    const good = getFixturePath('file2.json')
    expect(() => genDiff(bad, good)).toThrow(/Unsupported/i)
  })
})
