import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = name => join(__dirname, '..', '__fixtures__', name)
const read = name => fs.readFileSync(getFixturePath(name), 'utf-8').trim()

const expectedStylish = read('expected_stylish.txt')
const expectedPlain = read('expected_plain.txt')
const expectedJsonParsed = JSON.parse(read('expected_json.txt'))

describe('genDiff', () => {
  test.each(['json', 'yml'])('compare %s files in all output formats', (format) => {
    const file1 = getFixturePath(`file1.${format}`)
    const file2 = getFixturePath(`file2.${format}`)

    expect(genDiff(file1, file2)).toEqual(expectedStylish)
    expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish)
    expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain)
    expect(JSON.parse(genDiff(file1, file2, 'json'))).toEqual(expectedJsonParsed)
  })
})
