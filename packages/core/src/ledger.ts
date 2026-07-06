export type WorkoutPledgeState = 'proposed' | 'active' | 'completed'

export type WorkoutPledgeEvent = 'activate' | 'complete'

export const WORKOUT_PLEDGE_TRANSITIONS: Record<WorkoutPledgeState, Partial<Record<WorkoutPledgeEvent, WorkoutPledgeState>>> = {
  proposed: { activate: 'active' },
  active: { complete: 'completed' },
  completed: {},
}

export interface WorkoutPledge {
  id: string
  userId: string
  venueId: string
  state: WorkoutPledgeState
  scheduledAt: string
  activatedAt: string | null
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
    ...(event === 'activate' ? { activatedAt: now } : {}),
    ...(event === 'complete' ? { completedAt: now } : {}),
  }
}
