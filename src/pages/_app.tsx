import { AppProps } from "next/app";
import app from "@/firebase/firebase"; // Firebase SDK 구성을 위한 설정 파일 import
import { AuthProvider } from "@/firebase/auth";
import Layout from "@/components/Layout/Layout";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
