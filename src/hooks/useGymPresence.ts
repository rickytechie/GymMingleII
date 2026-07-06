import { useEffect, useState } from 'react'
import { supabase } from '@gymmingle/core'

export interface PresenceUser {
  user_id: string
  name: string
  avatar_url: string | null
  venue_id: string | null
  joined_at: string
}

export interface UseGymPresenceOptions {
  userId: string
  venueId?: string
  userMeta?: {
    name?: string
    avatar_url?: string | null
  }
}

export function useGymPresence({ userId, venueId, userMeta }: UseGymPresenceOptions) {
  const [activeUsers, setActiveUsers] = useState<PresenceUser[]>([])
  const [isConnected, setIsConnected] = useState(false)

  const displayName = userMeta?.name ?? 'Anonymous'
  const avatarUrl = userMeta?.avatar_url ?? null

  useEffect(() => {
    if (!userId) return

    const channel = supabase.channel('gym_presence', {
      config: { presence: { key: userId } },
    })

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState()
        const users: PresenceUser[] = Object.values(state).flatMap(
          (presences) =>
            (presences as PresenceUser[]).map((p) => ({
              user_id: p.user_id,
              name: p.name,
              avatar_url: p.avatar_url ?? null,
              venue_id: p.venue_id ?? null,
              joined_at: p.joined_at,
            })),
        )
        setActiveUsers(users)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED' || status === 'TIMED_OUT') {
          console.log('Presence pulse detected')
          setIsConnected(true)
          if (status === 'SUBSCRIBED') {
            await channel.track({
              user_id: userId,
              name: displayName,
              avatar_url: avatarUrl,
              venue_id: venueId ?? null,
              joined_at: new Date().toISOString(),
            })
          }
        }
      })

    return () => {
      channel.unsubscribe()
    }
  }, [userId, venueId, displayName, avatarUrl])

  return { activeUsers, isConnected }
}
