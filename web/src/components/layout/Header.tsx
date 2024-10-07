import React from "react";

import { ConnectKitButton } from "connectkit";

export default function Header() {
  return (
    <div className="flex justify-end items-center p-4 bg-white sticky top-0 z-50">
      <ConnectKitButton />
    </div>
  );
}
