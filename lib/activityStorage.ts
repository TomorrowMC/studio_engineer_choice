export interface ActivityRecord {
  id: string
  title: string
  date: string
  shop: string
  saved: string
  total: string
  icon: string
  color: string
  items: Array<{
    name: string
    originalPrice: number
    currentPrice: number
    status: string
  }>
  timestamp: number
}

const ACTIVITY_KEY = 'choice_engine_activities'

export const saveActivity = (activity: Omit<ActivityRecord, 'id' | 'timestamp'>) => {
  if (typeof window === 'undefined') return
  const existing = getActivities()
  const newRecord: ActivityRecord = {
    ...activity,
    id: Date.now().toString(),
    timestamp: Date.now(),
  }
  const updated = [newRecord, ...existing].slice(0, 20)
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updated))
}

export const getActivities = (): ActivityRecord[] => {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(ACTIVITY_KEY)
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

export const clearActivities = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(ACTIVITY_KEY)
}
