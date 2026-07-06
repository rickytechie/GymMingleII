export interface ClusterMember {
  userId: string
  name: string
  avatarUrl: string | null
  tags: string[]
}

export interface SocialCluster {
  id: string
  label: string
  members: ClusterMember[]
}

function tagKey(tag: string): string {
  return tag.toLowerCase().trim()
}

export function clusterMembers(members: ClusterMember[]): SocialCluster[] {
  const tagIndex = new Map<string, ClusterMember[]>()

  for (const member of members) {
    const seen = new Set<string>()
    for (const raw of member.tags) {
      const key = tagKey(raw)
      if (!key || seen.has(key)) continue
      seen.add(key)
      const group = tagIndex.get(key)
      if (group) {
        group.push(member)
      } else {
        tagIndex.set(key, [member])
      }
    }
  }

  const clusters: SocialCluster[] = []
  for (const [tag, tagged] of tagIndex) {
    if (tagged.length < 2) continue
    clusters.push({
      id: `cluster:${tag}`,
      label: tag,
      members: tagged,
    })
  }

  return clusters.sort((a, b) => b.members.length - a.members.length)
}
