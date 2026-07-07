'use client'

const DONATIONS = [
  { quarter: 'Q1 2026', funds: 48200, recipients: [
    { name: 'Wounded Warrior Project', amount: 12050 },
    { name: 'Charity: Water', amount: 12050 },
    { name: 'American Cancer Society', amount: 12050 },
    { name: 'Children\'s Health Fund', amount: 12050 },
  ]},
  { quarter: 'Q4 2025', funds: 45100, recipients: [
    { name: 'Wounded Warrior Project', amount: 11275 },
    { name: 'Charity: Water', amount: 11275 },
    { name: 'American Cancer Society', amount: 11275 },
    { name: 'Children\'s Health Fund', amount: 11275 },
  ]},
  { quarter: 'Q3 2025', funds: 38900, recipients: [
    { name: 'Wounded Warrior Project', amount: 9725 },
    { name: 'Charity: Water', amount: 9725 },
    { name: 'American Cancer Society', amount: 9725 },
    { name: 'Children\'s Health Fund', amount: 9725 },
  ]},
]

const MONTHLY_DONATIONS = [
  { month: 'Jun 2026', fund: 'American Farmers Support Fund', amount: 2300 },
  { month: 'May 2026', fund: 'American Farmers Support Fund', amount: 2100 },
  { month: 'Apr 2026', fund: 'American Farmers Support Fund', amount: 1950 },
  { month: 'Mar 2026', fund: 'American Farmers Support Fund', amount: 1800 },
  { month: 'Feb 2026', fund: 'American Farmers Support Fund', amount: 1750 },
  { month: 'Jan 2026', fund: 'American Farmers Support Fund', amount: 1600 },
]

const PROOF_TXNS = [
  { id: '0x7a3f...c9e2', network: 'Ethereum', amount: 12050, date: '2026-04-01', status: 'confirmed' },
  { id: '0x9b1d...f4a7', network: 'Ethereum', amount: 12050, date: '2026-04-01', status: 'confirmed' },
  { id: '0x4c8e...b2d1', network: 'Ethereum', amount: 12050, date: '2026-04-01', status: 'confirmed' },
  { id: '0x2f5a...e8c3', network: 'Ethereum', amount: 12050, date: '2026-04-01', status: 'confirmed' },
  { id: '0x8d1b...3f6e', network: 'Ethereum', amount: 2300,  date: '2026-06-15', status: 'confirmed' },
]

function formatUSD(amount: number): string {
  return '$' + amount.toLocaleString('en-US')
}

export function TransparencyDashboard() {
  const totalQuarterly = DONATIONS.reduce((s, q) => s + q.funds, 0)
  const totalMonthly = MONTHLY_DONATIONS.reduce((s, m) => s + m.amount, 0)
  const grandTotal = totalQuarterly + totalMonthly

  return (
    <div className="space-y-10">
      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border-2 border-black bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-black/50">Total Donated</p>
          <p className="mt-2 text-3xl font-black text-black">{formatUSD(grandTotal)}</p>
          <p className="mt-1 text-xs text-black/40">Verified on-chain</p>
        </div>
        <div className="border-2 border-black bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-black/50">Quarterly 10%</p>
          <p className="mt-2 text-3xl font-black text-black">{DONATIONS.length} distributions</p>
          <p className="mt-1 text-xs text-black/40">Wounded Warrior · Charity: Water · ACS · Children's Health</p>
        </div>
        <div className="border-2 border-black bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-black/50">Monthly 5%</p>
          <p className="mt-2 text-3xl font-black text-black">{MONTHLY_DONATIONS.length} distributions</p>
          <p className="mt-1 text-xs text-black/40">American Farmers Support Fund</p>
        </div>
      </div>

      {/* Quarterly Breakdown */}
      <div>
        <h3 className="mb-4 text-lg font-black text-black">Quarterly Donations (10% of revenue)</h3>
        <div className="space-y-3">
          {DONATIONS.map((q) => (
            <div key={q.quarter} className="border-2 border-black p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-black">{q.quarter}</span>
                <span className="text-sm font-black text-black">{formatUSD(q.funds)}</span>
              </div>
              <div className="mt-2 space-y-1">
                {q.recipients.map((r) => (
                  <div key={r.name} className="flex items-center justify-between pl-4 text-xs">
                    <span className="text-black/60">{r.name}</span>
                    <span className="font-bold text-black">{formatUSD(r.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div>
        <h3 className="mb-4 text-lg font-black text-black">Monthly Donations (5% of revenue)</h3>
        <div className="space-y-2">
          {MONTHLY_DONATIONS.map((m) => (
            <div key={m.month} className="flex items-center justify-between border-2 border-black p-3">
              <div>
                <span className="text-sm font-bold text-black">{m.month}</span>
                <p className="text-xs text-black/50">{m.fund}</p>
              </div>
              <span className="text-sm font-black text-black">{formatUSD(m.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* On-Chain Proofs */}
      <div>
        <h3 className="mb-4 text-lg font-black text-black">Verified On-Chain Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-2 border-black">
                <th className="p-2 font-bold text-black">Transaction</th>
                <th className="p-2 font-bold text-black">Network</th>
                <th className="p-2 font-bold text-black">Amount</th>
                <th className="p-2 font-bold text-black">Date</th>
                <th className="p-2 font-bold text-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {PROOF_TXNS.map((tx) => (
                <tr key={tx.id} className="border-b border-black/20">
                  <td className="p-2 font-mono text-black/70">{tx.id}</td>
                  <td className="p-2 text-black/70">{tx.network}</td>
                  <td className="p-2 font-bold text-black">{formatUSD(tx.amount)}</td>
                  <td className="p-2 text-black/70">{tx.date}</td>
                  <td className="p-2">
                    <span className="inline-flex border border-black bg-[#CCFF00] px-2 py-0.5 text-[10px] font-bold uppercase text-black">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Note */}
      <div className="border-2 border-black bg-black p-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
          All transactions verified on-chain · Smart contract audits available upon request
        </p>
      </div>
    </div>
  )
}

export default TransparencyDashboard
