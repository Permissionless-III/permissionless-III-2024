import React from "react";

import ConnectWalletButton from "@/components/layout/ConnectWalletButton";
import { useAccount } from "wagmi";

export default function Header() {
  const { address } = useAccount();
  return (
    <header className="flex justify-end items-center p-4 bg-white sticky top-0 z-50 h-[72px]">
      {address && <ConnectWalletButton />}
    </header>
  );
}
