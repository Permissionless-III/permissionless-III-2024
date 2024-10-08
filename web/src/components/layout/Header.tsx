import React from "react";

import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

export default function Header() {
  const { address } = useAccount();
  return (
    <header className="flex justify-end items-center p-4 bg-white sticky top-0 z-50">
      {address && <ConnectKitButton />}
    </header>
  );
}
