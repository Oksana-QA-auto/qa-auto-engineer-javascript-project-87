import fs from 'node:fs'
import path from 'node:path'

import YAML from 'js-yaml'

export default function parse(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8')
  const ext = path.extname(filepath).toLowerCase()

  if (ext === '.json') {
    return JSON.parse(content)
  }

  if (ext === '.yml' || ext === '.yaml') {
    return YAML.load(content)
  }

  throw new Error(`Unsupported file extension: ${ext}`)
}
