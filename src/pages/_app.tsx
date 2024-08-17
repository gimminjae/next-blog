import "../app/globals.css"
import { AppProps } from "next/app"
import { AuthProvider } from "@/firebase/auth"
import Layout from "@/components/Layout/Layout"
import React, { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import Loading from "@/components/common/Loading"
import { Provider as MyProvider } from "react-redux"
import { store } from "@/store/LoadingState"
import AlertComponent from "@/components/common/Alert"
import { useAlert } from "@/store/AlertState"

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const [loading, setLoading] = useState<Boolean>(false)
  store.subscribe(() => setLoading(store.getState().value))
  const { alerts } = useAlert()
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MyProvider store={store}>
          <Loading loading={loading} color="info" size="lg" type="spinner" />
          {alerts.map((alert, index) => (
            <AlertComponent
              key={index}
              description={alert.description}
              message={alert.message}
              type={alert.type}
            />
          ))}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MyProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp
