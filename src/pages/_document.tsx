import Document, { Html, Head, Main, NextScript } from "next/document"
import React from "react"

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Dev Diary</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
