import { useEffect, useRef, useState } from 'react'
import { supabase } from '@gymmingle/core'

export interface PresenceUser {
  user_id: string
  name: string
  avatar_url: string | null
  joined_at: string
}

export interface UseGymPresenceOptions {
  venueId: string
  userId: string
  userMeta?: {
    name?: string
    avatar_url?: string | null
  }
}

export function useGymPresence({ venueId, userId, userMeta }: UseGymPresenceOptions) {
  const [activeUsers, setActiveUsers] = useState<PresenceUser[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null)

  useEffect(() => {
    if (!venueId || !userId) return

    const channel = supabase.channel(`venue:${venueId}`, {
      config: {
        presence: {
          key: userId,
        },
      },
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
              joined_at: p.joined_at,
            })),
        )
        setActiveUsers(users)
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        console.log('Presence pulse detected', { userId: key })
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true)
          setError(null)
          await channel.track({
            user_id: userId,
            name: userMeta?.name ?? 'Anonymous',
            avatar_url: userMeta?.avatar_url ?? null,
            joined_at: new Date().toISOString(),
          })
        } else if (status === 'CHANNEL_ERROR') {
          setError(new Error('Failed to connect to presence channel'))
          setIsConnected(false)
        }
      })

    channelRef.current = channel

    return () => {
      channel.unsubscribe()
      channelRef.current = null
    }
  }, [venueId, userId, userMeta?.name, userMeta?.avatar_url])

  return { activeUsers, isConnected, error }
}
