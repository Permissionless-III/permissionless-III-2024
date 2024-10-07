"use client";

import Header from "./Header";
import { Web3Provider } from "./Web3Provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
      <Header />
      {children}
    </Web3Provider>
  );
}
