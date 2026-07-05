import LandingHeader from '../src/components/LandingHeader'
import WaitlistForm from '../src/components/WaitlistForm'

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LandingHeader />
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex rounded-full border border-[#CCFF00] bg-[#CCFF00]/15 px-3 py-1 text-sm font-semibold text-slate-800">
            Hybrid fitness matching is here
          </span>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
            Find your workout tribe in one connected experience.
          </h1>
          <p className="max-w-xl text-lg text-slate-600">
            GymMingle brings together web and mobile members with shared matching logic, instant waitlist flow, and a polished brand experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#waitlist" className="rounded-full bg-[#CCFF00] px-6 py-3 font-semibold text-slate-950 transition hover:opacity-90">
              Join the waitlist
            </a>
            <a href="#" className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]">
              Explore the concept
            </a>
          </div>
        </div>
        <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-6 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-[#CCFF00]">Preview</p>
            <div className="mt-6 space-y-4">
              <div className="h-3 w-24 rounded-full bg-[#CCFF00]" />
              <div className="h-3 w-full rounded-full bg-slate-700" />
              <div className="h-3 w-5/6 rounded-full bg-slate-700" />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-8">
        <WaitlistForm />
      </section>
    </main>
  )
}
