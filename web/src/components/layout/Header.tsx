import React from "react";

import ConnectWalletButton from "@/components/layout/ConnectWalletButton";
import { useAccount } from "wagmi";
import Link from "next/link";

export default function Header() {
  const { address } = useAccount();
  return (
    <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-50 h-[72px]">
      <Link href="/" className="font-medium text-lg">
        BitVote
      </Link>
      {address && <ConnectWalletButton />}
    </header>
  );
}
