import "../app/globals.css"
import { AppProps } from "next/app"
import { AuthProvider } from "@/firebase/auth"
import Layout from "@/components/Layout/Layout"
import React, { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import Loading from "@/components/Loading"
import { Provider as MyProvider } from "react-redux"
import { store } from "@/components/LoadingState"

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const [loading, setLoading] = useState<Boolean>(false)
  store.subscribe(() => {
    setLoading(store.getState().value)
  })
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MyProvider store={store}>
          <Layout>
            <Loading loading={loading} color="info" size="lg" type="spinner" />
            <Component {...pageProps} />
          </Layout>
        </MyProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp
