// Utility for managing part selections in localStorage

export type PartType = 'oem' | 'aftermarket' | 'refurbished' | 'budget'

export interface PartSelection {
  itemName: string
  selectedType: PartType
  brand: string
  price: number
}

export interface QuoteData {
  selections: Record<string, PartSelection>
  timestamp: number
}

const STORAGE_KEY = 'choice_engine_selections'

export const savePartSelection = (itemName: string, selection: PartSelection) => {
  if (typeof window === 'undefined') return
  
  const data = getQuoteData()
  data.selections[itemName] = selection
  data.timestamp = Date.now()
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const getPartSelection = (itemName: string): PartSelection | null => {
  if (typeof window === 'undefined') return null
  
  const data = getQuoteData()
  return data.selections[itemName] || null
}

export const getQuoteData = (): QuoteData => {
  if (typeof window === 'undefined') return { selections: {}, timestamp: 0 }
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return { selections: {}, timestamp: 0 }
  
  try {
    return JSON.parse(stored)
  } catch {
    return { selections: {}, timestamp: 0 }
  }
}

export const clearSelections = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

export const calculateTotalSavings = (originalTotal: number): number => {
  const data = getQuoteData()
  let totalSavings = 0
  
  // Original prices for each item
  const originalPrices: Record<string, number> = {
    'Front Brake Pads': 420,
    'Brake Rotors (Pair)': 340,
    'Labor (2.5 hrs)': 300,
    'Brake Fluid Flush': 89
  }
  
  Object.entries(data.selections).forEach(([itemName, selection]) => {
    const original = originalPrices[itemName] || 0
    totalSavings += (original - selection.price)
  })
  
  return totalSavings
}

