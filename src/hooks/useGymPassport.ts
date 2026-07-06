import { useMemo } from 'react'
import {
  buildPassport,
  type VisitRecord,
  type GymPassport,
} from '@gymmingle/core'

export function useGymPassport(userId: string, visits: VisitRecord[]) {
  return useMemo<GymPassport>(() => {
    return buildPassport(userId, visits)
  }, [userId, visits])
}
