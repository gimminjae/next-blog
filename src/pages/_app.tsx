import "../app/globals.css"
import { AppProps } from "next/app"
import { AuthProvider } from "@/firebase/auth"
import Layout from "@/components/Layout/Layout"
import React, { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import Loading from "@/components/common/Loading"
import { Provider as MyProvider } from "react-redux"
import { store } from "@/store/LoadingState"
// import { DefaultSeo } from "next-seo"

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const [loading, setLoading] = useState<Boolean>(false)
  store.subscribe(() => setLoading(store.getState().value))
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MyProvider store={store}>
          {/* <DefaultSeo /> */}
          <Loading loading={loading} color="info" size="lg" type="spinner" />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MyProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp
