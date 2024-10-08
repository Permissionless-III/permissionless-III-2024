"use client";

import Header from "./Header";
import { Web3Provider } from "./Web3Provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
      <Header />
      <main className="h-[calc(100vh-72px)] w-full flex items-center justify-center text-center">
        {children}
      </main>
    </Web3Provider>
  );
}
