import type { StorageAdapter } from './storage'
import { isValidEmail } from './validators'
import { supabase } from './supabase'

export type WaitlistPayload = {
  email: string
  sportInterest: string
  createdAt: string
}

const KEY = 'gymmingle.waitlist.v1'

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

/**
 * Validate an email and persist it to the Supabase `waitlist` table.
 * Throws when the email is invalid or the insert fails.
 */
export async function joinWaitlist(email: string): Promise<void> {
  if (!isValidEmail(email)) {
    throw new Error('Please enter a valid email address.')
  }

  const { error } = await supabase.from('waitlist').insert([{ email: normalizeEmail(email) }])

  if (error) {
    throw error
  }
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

