/**
 * Script to reduce JSON objects to only the specified fields.
 *
 * Usage: bun reduceFields.ts <INPUT_PATH> <OUTPUT_PATH> <FIELD1> [FIELD2] ...
 * Example: bun reduceFields.ts src/sets/MID-card-base.json src/sets/MID-slim.json name set type_line
 */

import { file, write } from 'bun'

type Json = Record<string, unknown>

function pickFields<T extends Json>(arr: T[], keep: (keyof T)[]): Partial<T>[] {
  return arr.map(
    (obj) => Object.fromEntries(keep.filter((k) => k in obj).map((k) => [k, obj[k]])) as Partial<T>,
  )
}

async function main() {
  const [inputPath, outputPath] = process.argv.slice(2)

  if (!inputPath || !outputPath) {
    console.error('Usage: bun reduceFields.ts <INPUT_PATH> <OUTPUT_PATH>')
    process.exit(1)
  }

  const input = await file(inputPath).json()

  if (!Array.isArray(input)) {
    console.error('Input file must contain a JSON array.')
    process.exit(1)
  }

  const fields = ['name', 'colors', 'rarity', 'image_uris']

  const reduced = pickFields(input as Json[], fields)

  await write(outputPath, JSON.stringify(reduced, null, 2))
  console.log(`Wrote ${reduced.length} objects to ${outputPath}`)
}

main()
