/**
 * Script to fetch all cards from a Magic set via Scryfall API
 *
 * Usage: bun scripts/fetch-set-all.ts <SET_CODE>
 * Example: bun scripts/fetch-set-all.ts MID
 */

import { write } from 'bun'
import { join } from 'path'

interface ScryfallCard {
  name: string
  set: string
  type_line: string
  oracle_id: string
  [key: string]: unknown
}

interface ScryfallResponse {
  object: string
  total_cards: number
  has_more: boolean
  next_page?: string
  data: ScryfallCard[]
}

const SCRYFALL_API_DELAY = 500 // ms between requests

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function fetchCards(setCode: string): Promise<ScryfallCard[]> {
  const allCards: ScryfallCard[] = []

  const query = encodeURIComponent(`set:${setCode} unique:cards`)
  let url: string | null = `https://api.scryfall.com/cards/search?q=${query}`

  console.log(`Fetching cards from set: ${setCode.toUpperCase()}`)
  console.log(`Query: set:${setCode} unique:cards`)

  while (url) {
    console.log(`Fetching: ${url}`)

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'WhatCouldTheyHave/1.0',
        Accept: 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${await res.text()}`)
    }

    const data: ScryfallResponse = await res.json()
    allCards.push(...data.data)

    console.log(`  Retrieved ${data.data.length} cards (total: ${allCards.length})`)

    if (data.has_more && data.next_page) {
      url = data.next_page
      await sleep(SCRYFALL_API_DELAY)
    } else {
      url = null
    }
  }

  return allCards
}

async function saveSetData(setCode: string, cards: ScryfallCard[]): Promise<void> {
  const setsDir = join(import.meta.dir, '/src/sets')
  const setCodeUpper = setCode.toUpperCase()

  const jsonPath = join(setsDir, `${setCodeUpper}-card-base.json`)
  await write(jsonPath, JSON.stringify(cards, null, 2))
  console.log(`\nSaved ${cards.length} cards to: ${jsonPath}`)
}

async function main() {
  const setCode = process.argv[2]

  if (!setCode) {
    console.error('Usage: bun scripts/fetch-set-all.ts <SET_CODE>')
    console.error('Example: bun scripts/fetch-set-all.ts MID')
    process.exit(1)
  }

  try {
    const cards = await fetchCards(setCode)

    if (cards.length === 0) {
      console.error(`No cards found for set: ${setCode}`)
      process.exit(1)
    }

    console.log(`\nTotal cards: ${cards.length}`)
    await saveSetData(setCode, cards)

    console.log('\nDone!')
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

main()
