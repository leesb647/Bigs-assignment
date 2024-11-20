'use client'

import { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/tanstack-query/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RootStore } from './store/root-store'
import { StoreProvider } from './store/context'
import { NuqsAdapter } from 'nuqs/adapters/next'

const rootStore = new RootStore()

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <NuqsAdapter>
        <StoreProvider value={rootStore}>
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
        </StoreProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  )
}
