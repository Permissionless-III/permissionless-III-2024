"use client";

import Header from "./Header";
import { Web3Provider } from "./Web3Provider";
import { AuthProvider } from "@/contexts/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow bg-gray-100 p-6 lg:p-8 flex">
            <div className="flex-grow max-w-md text-center mx-auto">
              {children}
            </div>
          </main>
        </div>
      </AuthProvider>
    </Web3Provider>
  );
}
