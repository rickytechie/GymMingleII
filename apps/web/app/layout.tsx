import type { Metadata } from 'next'
import './globals.css'

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'GymMingle — Global Lifestyle Orchestration Engine',
  description: 'Workout matching that feels human. Discover fitness partners across 52 markets with MingleCoin-powered premium experiences.',
  openGraph: {
    title: 'GymMingle — Global Lifestyle Orchestration Engine',
    description: 'Discover fitness partners across 52 markets.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">{children}</body>
    </html>
  )
}
