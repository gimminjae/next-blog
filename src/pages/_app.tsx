import { AppProps } from "next/app";
import app from "@/firebase/firebase"; // Firebase SDK 구성을 위한 설정 파일 import
import { AuthProvider } from "@/firebase/auth";
import Layout from "@/components/Layout/Layout";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
