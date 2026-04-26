export type MtgColor = 'W' | 'U' | 'B' | 'R' | 'G'

export interface SlotDef {
  key: string
  label: string
  colors: MtgColor[]
  manaSymbols: string[]
}

export const SLOTS: SlotDef[] = [
  { key: 'W', label: 'White Common', colors: ['W'], manaSymbols: ['w'] },
  { key: 'U', label: 'Blue Common', colors: ['U'], manaSymbols: ['u'] },
  { key: 'B', label: 'Black Common', colors: ['B'], manaSymbols: ['b'] },
  { key: 'R', label: 'Red Common', colors: ['R'], manaSymbols: ['r'] },
  { key: 'G', label: 'Green Common', colors: ['G'], manaSymbols: ['g'] },
  { key: 'WB', label: 'Silverquill', colors: ['W', 'B'], manaSymbols: ['w', 'b'] },
  { key: 'WR', label: 'Lorehold', colors: ['W', 'R'], manaSymbols: ['w', 'r'] },
  { key: 'UR', label: 'Prismari', colors: ['U', 'R'], manaSymbols: ['u', 'r'] },
  { key: 'UG', label: 'Quandrix', colors: ['U', 'G'], manaSymbols: ['u', 'g'] },
  { key: 'BG', label: 'Witherbloom', colors: ['B', 'G'], manaSymbols: ['b', 'g'] },
]
