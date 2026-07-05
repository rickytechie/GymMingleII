import type { Metadata } from 'next'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'GymMingle',
  description: 'Workout matching that feels human.',
}
