import type { StorageAdapter } from './storage'
import { isValidEmail } from './validators'

export type WaitlistPayload = {
  email: string
  sportInterest: string
  createdAt: string
}

const KEY = 'gymmingle.waitlist.v1'

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export async function storeWaitlist(
  payload: WaitlistPayload,
  storage: StorageAdapter,
): Promise<WaitlistPayload> {
  if (!isValidEmail(payload.email)) {
    throw new Error('Invalid email')
  }

  const normalized = {
    ...payload,
    email: normalizeEmail(payload.email),
  }

  const existingRaw = await storage.getItem(KEY)
  const existing: WaitlistPayload[] = existingRaw ? JSON.parse(existingRaw) : []

  const deduped = existing.filter((x) => x.email !== normalized.email)
  deduped.unshift(normalized)

  await storage.setItem(KEY, JSON.stringify(deduped.slice(0, 1000)))

  return normalized
}

export async function getStoredWaitlistCount(storage: StorageAdapter): Promise<number> {
  const existingRaw = await storage.getItem(KEY)
  const existing: WaitlistPayload[] = existingRaw ? JSON.parse(existingRaw) : []
  return existing.length
}

