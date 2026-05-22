export type SeventeenLandsEntry = {
  name: string
  ever_drawn_win_rate: number | null
}

export type Submission = {
  'Document ID': string
  selectedCards: string[]
  tiebreaker: string
}
