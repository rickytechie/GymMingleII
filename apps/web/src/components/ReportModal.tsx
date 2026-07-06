'use client'

import { useState } from 'react'

interface ReportModalProps {
  type: 'user' | 'venue'
  targetName: string
  targetId: string
  onClose: () => void
}

const REPORT_REASONS = [
  'Inappropriate content',
  'Fake profile',
  'Harassment',
  'Spam',
  'Offensive behavior',
  'Venue closed or wrong location',
  'Other',
]

export function ReportModal({ type, targetName, targetId, onClose }: ReportModalProps) {
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Report ${type} [${targetId}]: ${targetName} — ${reason} — ${details}`)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={onClose}>
        <div className="bg-white border-2 border-black p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
          <span className="text-3xl font-black text-[#CCFF00] bg-black px-2 py-1 inline-block">✓</span>
          <h3 className="mt-4 text-xl font-black text-black">Report submitted</h3>
          <p className="mt-2 text-sm text-black/60">Thank you. Our team will review this report.</p>
          <button
            onClick={onClose}
            className="mt-6 border-2 border-black bg-black text-white px-5 py-2 text-sm font-bold uppercase tracking-wider"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={onClose}>
      <div className="bg-white border-2 border-black p-8 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-black text-black uppercase tracking-tight">
          Report {type === 'user' ? 'User' : 'Venue'}
        </h3>
        <p className="mt-1 text-sm text-black/50 truncate">{targetName}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-black/50">Reason</label>
            <select
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1 block w-full border-2 border-black bg-white px-3 py-2 text-sm font-bold text-black focus:outline-none focus:border-[#CCFF00]"
            >
              <option value="" disabled>Select a reason</option>
              {REPORT_REASONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-black/50">Details (optional)</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
              className="mt-1 block w-full border-2 border-black bg-white px-3 py-2 text-sm font-bold text-black focus:outline-none focus:border-[#CCFF00] placeholder:text-black/30"
              placeholder="Tell us more..."
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 border-2 border-black bg-black text-white px-4 py-3 text-sm font-bold uppercase tracking-wider hover:bg-black/80"
            >
              Submit report
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border-2 border-black/20 px-4 py-3 text-sm font-bold text-black/60 hover:border-black hover:text-black"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
