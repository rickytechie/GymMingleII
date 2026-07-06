import { useMemo } from 'react'
import {
  clusterByVenue,
  type VenueActivity,
  type SocialCluster,
} from '@gymmingle/core'

export function useSocialClusters(activity: VenueActivity[]) {
  return useMemo<SocialCluster[]>(() => {
    if (activity.length < 2) return []
    return clusterByVenue(activity)
  }, [activity])
}
