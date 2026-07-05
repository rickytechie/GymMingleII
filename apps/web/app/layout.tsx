import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GymMingle',
  description: 'Workout matching that feels human.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
