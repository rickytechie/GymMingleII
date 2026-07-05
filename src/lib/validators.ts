export function isValidEmail(email: string) {
  const v = email.trim()
  // Simple pragmatic validation for UX; backend should re-validate.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

