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

// Нормализуем переводы строк (Windows vs Unix)
const normalize = s => s.replace(/\r\n/g, '\n')

describe('genDiff', () => {
  test.each(['json', 'yml'])('compare %s files in all output formats', (format) => {
    const file1 = getFixturePath(`file1.${format}`)
    const file2 = getFixturePath(`file2.${format}`)

    expect(normalize(genDiff(file1, file2))).toEqual(normalize(expectedStylish))

    expect(normalize(genDiff(file1, file2, 'stylish'))).toEqual(normalize(expectedStylish))

    expect(normalize(genDiff(file1, file2, 'plain'))).toEqual(normalize(expectedPlain))

    expect(JSON.parse(genDiff(file1, file2, 'json'))).toEqual(expectedJsonParsed)
  })
})
