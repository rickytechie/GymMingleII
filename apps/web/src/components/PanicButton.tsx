'use client'
import { useState } from 'react'

interface PanicButtonProps {
  userName?: string
  userPhone?: string
  emergencyContactPhone?: string
}

type PanicState = 'idle' | 'confirming' | 'sending' | 'sent' | 'error'

export function PanicButton({ userName, userPhone, emergencyContactPhone }: PanicButtonProps) {
  const [state, setState] = useState<PanicState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handlePanic = async () => {
    setState('sending')
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 })
      )

      const res = await fetch('/api/panic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          userPhone,
          emergencyContactPhone,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        }),
      })

      if (res.ok) setState('sent')
      else {
        const data = await res.json()
        setErrorMsg(data.error || 'Failed to send alert')
        setState('error')
      }
    } catch {
      setErrorMsg('Could not get location. Please enable location services.')
      setState('error')
    }
  }

  if (state === 'confirming') {
    return (
      <div className="glass-dark p-4 text-center">
        <p className="text-white text-sm font-bold mb-4">Are you sure?</p>
        <div className="flex gap-2">
          <button
            onClick={handlePanic}
            className="flex-1 border-2 border-red-600 bg-red-600 text-white py-2 text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors"
          >
            Yes - Send Alert
          </button>
          <button
            onClick={() => setState('idle')}
            className="flex-1 border-2 border-white/30 text-white/70 py-2 text-xs font-bold uppercase tracking-wider hover:border-white hover:text-white transition-colors"
          >
            No
          </button>
        </div>
      </div>
    )
  }

  if (state === 'sending') {
    return (
      <div className="border-2 border-black bg-black text-white p-4 text-center">
        <p className="text-sm font-bold animate-pulse">Sending emergency alert...</p>
      </div>
    )
  }

  if (state === 'sent') {
    return (
      <div className="border-2 border-[#CCFF00] bg-black text-[#CCFF00] p-4 text-center">
        <p className="text-sm font-bold">Emergency alert sent successfully</p>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className="border-2 border-red-600 bg-black text-red-500 p-4 text-center">
        <p className="text-sm font-bold mb-1">Failed to send alert</p>
        {errorMsg && <p className="text-xs text-red-400/70">{errorMsg}</p>}
        <button
          onClick={() => setState('idle')}
          className="mt-3 border border-red-600/50 text-red-400 px-4 py-1 text-xs font-bold uppercase tracking-wider hover:border-red-600 hover:text-red-500 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setState('confirming')}
      className="w-full border-2 border-red-600 bg-black text-white py-4 px-6 text-lg font-black uppercase tracking-widest hover:bg-red-900/30 transition-all flex items-center justify-center gap-3"
    >
      <span className="text-xl">PANIC</span>
    </button>
  )
}
