import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import {createClient} from '../apolloClient'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client = {createClient("")}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
