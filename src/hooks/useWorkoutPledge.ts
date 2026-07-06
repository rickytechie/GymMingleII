import { useCallback, useReducer } from 'react'
import {
  canTransition,
  transitionPledge,
  type WorkoutPledge,
  type WorkoutPledgeEvent,
  type WorkoutPledgeState,
} from '@gymmingle/core'

interface State {
  pledge: WorkoutPledge
  error: string | null
}

type Action =
  | { type: 'transition'; event: WorkoutPledgeEvent }
  | { type: 'reset'; pledge: WorkoutPledge }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'transition': {
      if (!canTransition(state.pledge.state, action.event)) {
        return { ...state, error: `Cannot transition "${state.pledge.state}" via "${action.event}"` }
      }
      return {
        pledge: transitionPledge(state.pledge, action.event),
        error: null,
      }
    }
    case 'reset':
      return { pledge: action.pledge, error: null }
  }
}

export function useWorkoutPledge(initial: WorkoutPledge) {
  const [{ pledge, error }, dispatch] = useReducer(reducer, { pledge: initial, error: null })

  const checkIn = useCallback(() => dispatch({ type: 'transition', event: 'check_in' }), [])
  const complete = useCallback(() => dispatch({ type: 'transition', event: 'complete' }), [])
  const cancel = useCallback(() => dispatch({ type: 'transition', event: 'cancel' }), [])
  const reset = useCallback((p: WorkoutPledge) => dispatch({ type: 'reset', pledge: p }), [])

  return {
    pledge,
    state: pledge.state as WorkoutPledgeState,
    canCheckIn: canTransition(pledge.state, 'check_in'),
    canComplete: canTransition(pledge.state, 'complete'),
    canCancel: canTransition(pledge.state, 'cancel'),
    checkIn,
    complete,
    cancel,
    reset,
    error,
  }
}
