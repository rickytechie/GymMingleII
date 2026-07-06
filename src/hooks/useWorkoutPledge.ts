import { useCallback, useReducer } from 'react'
import {
  canTransition,
  transitionPledge,
  type WorkoutPledge,
  type WorkoutPledgeEvent,
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

  const activate = useCallback(() => dispatch({ type: 'transition', event: 'activate' }), [])
  const complete = useCallback(() => dispatch({ type: 'transition', event: 'complete' }), [])
  const reset = useCallback((p: WorkoutPledge) => dispatch({ type: 'reset', pledge: p }), [])

  return {
    pledge,
    state: pledge.state,
    canActivate: canTransition(pledge.state, 'activate'),
    canComplete: canTransition(pledge.state, 'complete'),
    activate,
    complete,
    reset,
    error,
  }
}
