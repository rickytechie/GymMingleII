'use client'

import { ThirdwebProvider } from '@thirdweb-dev/react'
import { Base } from '@thirdweb-dev/chains'

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider
      activeChain={Base}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      supportedChains={[Base]}
    >
      {children}
    </ThirdwebProvider>
  )
}

export default Web3Provider
