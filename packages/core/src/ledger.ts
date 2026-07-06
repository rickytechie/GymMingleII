export type WorkoutPledgeState = 'pledged' | 'active' | 'completed' | 'missed' | 'cancelled'

export type WorkoutPledgeEvent = 'check_in' | 'complete' | 'cancel' | 'expire'

export const WORKOUT_PLEDGE_TRANSITIONS: Record<WorkoutPledgeState, Partial<Record<WorkoutPledgeEvent, WorkoutPledgeState>>> = {
  pledged: { check_in: 'active', cancel: 'cancelled', expire: 'missed' },
  active: { complete: 'completed', expire: 'missed' },
  completed: {},
  missed: {},
  cancelled: {},
}

export interface WorkoutPledge {
  id: string
  userId: string
  venueId: string
  state: WorkoutPledgeState
  scheduledAt: string
  checkedInAt: string | null
  completedAt: string | null
  createdAt: string
}

export function canTransition(state: WorkoutPledgeState, event: WorkoutPledgeEvent): boolean {
  return event in WORKOUT_PLEDGE_TRANSITIONS[state]
}

export function transitionPledge(pledge: WorkoutPledge, event: WorkoutPledgeEvent, timestamp?: string): WorkoutPledge {
  const nextState = WORKOUT_PLEDGE_TRANSITIONS[pledge.state]?.[event]
  if (!nextState) {
    throw new Error(`Cannot transition "${pledge.state}" via "${event}"`)
  }

  const now = timestamp ?? new Date().toISOString()

  return {
    ...pledge,
    state: nextState,
    ...(event === 'check_in' ? { checkedInAt: now } : {}),
    ...(event === 'complete' ? { completedAt: now } : {}),
  }
}
