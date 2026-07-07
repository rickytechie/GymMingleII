import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-black bg-white py-8 text-center text-xs text-black/50">
      <div className="mx-auto mb-4 flex max-w-6xl items-center justify-center gap-6 px-6">
        <Link
          href="/about"
          className="border-2 border-black px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black transition hover:bg-black hover:text-white"
        >
          Founder
        </Link>
        <Link
          href="/project"
          className="border-2 border-black px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black transition hover:bg-black hover:text-white"
        >
          Project
        </Link>
        <Link
          href="/vision"
          className="border-2 border-black px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black transition hover:bg-black hover:text-white"
        >
          Vision
        </Link>
        <Link
          href="/vault"
          className="border-2 border-black bg-black px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#CCFF00] transition hover:opacity-90"
        >
          Strategy Vault
        </Link>
      </div>
      <p>Built and Designed by RKYRNSM | RICKY RANSOM, LLC | &copy; 2026</p>
    </footer>
  )
}

export default SiteFooter
