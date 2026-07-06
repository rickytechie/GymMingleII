export interface VenueActivity {
  userId: string
  name: string
  venueId: string
  avatarUrl: string | null
}

export interface SocialCluster {
  id: string
  venueId: string
  memberCount: number
  members: VenueActivity[]
}

export function clusterByVenue(activity: VenueActivity[]): SocialCluster[] {
  const groups = new Map<string, VenueActivity[]>()

  for (const entry of activity) {
    const group = groups.get(entry.venueId)
    if (group) {
      group.push(entry)
    } else {
      groups.set(entry.venueId, [entry])
    }
  }

  const clusters: SocialCluster[] = []
  for (const [venueId, members] of groups) {
    clusters.push({
      id: `venue-cluster:${venueId}`,
      venueId,
      memberCount: members.length,
      members,
    })
  }

  return clusters.sort((a, b) => b.memberCount - a.memberCount)
}
