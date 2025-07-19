import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

import parse from '../src/parser.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = name => path.join(__dirname, '..', '__fixtures__', name)

test('parse() correctly parses JSON files', () => {
  const filepath = getFixturePath('file1.json')
  const raw = fs.readFileSync(filepath, 'utf-8')
  expect(() => JSON.parse(raw)).not.toThrow()

  const result = parse(filepath)
  expect(result).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  })
})

test('parse() throws on unsupported extensions', () => {
  const badPath = getFixturePath('file1.txt')
  expect(() => parse(badPath)).toThrow(/Unsupported file extension: \.txt/)
})
