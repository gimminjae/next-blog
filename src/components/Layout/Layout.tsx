import Link from "next/link";
import React, { ReactNode, useEffect, useMemo } from "react";
import Header from "./Header";
import { useRouter } from "next/router";

function Layout({ children }: React.PropsWithChildren<{}>) {
  const router = useRouter()
  useEffect(() => {
    console.log(router)
  }, [router.pathname])
  const isPostWritePage = useMemo(() => router.pathname.includes('write') || router.pathname.includes('edit'), [router.pathname])
  return (
    <>
      <Header />
      <div className={isPostWritePage ? "" : "sm:container sm:mx-auto"}>{children}</div>
    </>
  );
}

export default Layout;
