import { getFrontFaceName } from '@/app/common/cardName'

export type SubmissionLike = {
  selectedCards: string[]
  tiebreaker: string
}

export function countPicks(cardName: string, submissions: SubmissionLike[]): number {
  let n = 0
  for (const sub of submissions) {
    const inSelected = sub.selectedCards.some((c) => getFrontFaceName(c) === cardName)
    const isTiebreaker = getFrontFaceName(sub.tiebreaker) === cardName
    if (inSelected || isTiebreaker) n += 1
  }
  return n
}
