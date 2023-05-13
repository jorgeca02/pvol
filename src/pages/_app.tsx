import '@/styles/globals.css'
import { getClientSSR } from '@/utils/apolloClient'
import { ApolloProvider } from '@apollo/client'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={getClientSSR()}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
