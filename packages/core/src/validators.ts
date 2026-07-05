export function isValidEmail(email: string) {
  // Simple, robust email validation for MVP.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

