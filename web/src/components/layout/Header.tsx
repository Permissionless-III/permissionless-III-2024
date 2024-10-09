import React from "react";

import ConnectWalletButton from "@/components/layout/ConnectWalletButton";
import { useAccount } from "wagmi";
import Link from "next/link";
import LogoLink from "./LogoLink";

export default function Header() {
  const { address } = useAccount();
  return (
    <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-50 h-[72px]">
      <LogoLink />
      {address && <ConnectWalletButton />}
    </header>
  );
}
