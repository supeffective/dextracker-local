export type DaytimeTag =
  | 'early_morning'
  | 'mid_morning'
  | 'late_morning'
  | 'early_afternoon'
  | 'mid_afternoon'
  | 'late_afternoon'
  | 'early_evening'
  | 'mid_evening'
  | 'late_evening'
  | 'early_night'
  | 'mid_night'
  | 'late_night'

export function calculateDaytimeTag(): DaytimeTag {
  const now = new Date()
  const hour = now.getHours()
  if (hour >= 5 && hour < 8) {
    return 'early_morning'
  }
  if (hour >= 8 && hour < 10) {
    return 'mid_morning'
  }
  if (hour >= 10 && hour < 12) {
    return 'late_morning'
  }
  if (hour >= 12 && hour < 14) {
    return 'early_afternoon'
  }
  if (hour >= 14 && hour < 16) {
    return 'mid_afternoon'
  }
  if (hour >= 16 && hour < 18) {
    return 'late_afternoon'
  }
  if (hour >= 18 && hour < 20) {
    return 'early_evening'
  }
  if (hour >= 20 && hour < 22) {
    return 'mid_evening'
  }
  if (hour >= 22 && hour < 24) {
    return 'late_evening'
  }
  if (hour >= 0 && hour < 2) {
    return 'early_night'
  }
  if (hour >= 2 && hour < 4) {
    return 'mid_night'
  }
  return 'late_night'
}
