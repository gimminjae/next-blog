import Link from "next/link";
import React, { ReactNode } from "react";
import Header from "./Header";

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
