export interface VisitRecord {
  venueId: string
  venueName: string
  visitedAt: string
}

export interface GymPassport {
  userId: string
  visits: VisitRecord[]
  totalVisits: number
  uniqueVenues: number
  currentStreak: number
}

export function buildPassport(userId: string, visits: VisitRecord[]): GymPassport {
  const sorted = [...visits].sort(
    (a, b) => new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime(),
  )

  const uniqueVenues = new Set(sorted.map((v) => v.venueId)).size

  let currentStreak = 0
  const today = new Date()
  for (const visit of sorted) {
    const visitDate = new Date(visit.visitedAt)
    const diffDays = Math.floor(
      (today.getTime() - visitDate.getTime()) / (1000 * 60 * 60 * 24),
    )
    if (diffDays === currentStreak || diffDays === currentStreak + 1) {
      currentStreak++
    } else if (diffDays > currentStreak + 1) {
      break
    }
  }

  return {
    userId,
    visits: sorted,
    totalVisits: sorted.length,
    uniqueVenues,
    currentStreak,
  }
}

export function getVenueVisitCount(passport: GymPassport, venueId: string): number {
  return passport.visits.filter((v) => v.venueId === venueId).length
}
