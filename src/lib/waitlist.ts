export type WaitlistPayload = {
  email: string
  sportInterest: string
  createdAt: string
}

const KEY = 'gymmingle.waitlist.v1'

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export function storeWaitlist(payload: WaitlistPayload) {
  const normalized = {
    ...payload,
    email: normalizeEmail(payload.email),
  }

  const existingRaw = localStorage.getItem(KEY)
  const existing: WaitlistPayload[] = existingRaw ? JSON.parse(existingRaw) : []
  const deduped = existing.filter((x) => x.email !== normalized.email)
  deduped.unshift(normalized)
  localStorage.setItem(KEY, JSON.stringify(deduped.slice(0, 1000)))

  return normalized
}

export function getStoredWaitlistCount() {
  const existingRaw = localStorage.getItem(KEY)
  const existing: WaitlistPayload[] = existingRaw ? JSON.parse(existingRaw) : []
  return existing.length
}

