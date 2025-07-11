import fs from 'node:fs'
import path from 'node:path'

import yaml from 'js-yaml'

export default function parse(filepath) {
  const fullPath = path.resolve(process.cwd(), filepath)
  const rawData = fs.readFileSync(fullPath, 'utf-8')
  const ext = path.extname(fullPath).toLowerCase()

  switch (ext) {
    case '.json':
      return JSON.parse(rawData)

    case '.yml':
    case '.yaml':
      return yaml.load(rawData)

    default:
      throw new Error(`Unsupported file extension: ${ext}`)
  }
}
