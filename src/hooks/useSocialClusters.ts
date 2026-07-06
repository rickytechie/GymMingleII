import { useMemo } from 'react'
import {
  clusterMembers,
  type ClusterMember,
  type SocialCluster,
} from '@gymmingle/core'

export function useSocialClusters(members: ClusterMember[]) {
  return useMemo<SocialCluster[]>(() => {
    if (members.length < 2) return []
    return clusterMembers(members)
  }, [members])
}
