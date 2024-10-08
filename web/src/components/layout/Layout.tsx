"use client";

import Header from "./Header";
import { Web3Provider } from "./Web3Provider";
import { VidProvider } from "@/contexts/VidContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
      <VidProvider>
        <Header />
        <main className="h-[calc(100vh-72px)] w-full flex items-center justify-center text-center bg-gray-100">
          {children}
        </main>
      </VidProvider>
    </Web3Provider>
  );
}
